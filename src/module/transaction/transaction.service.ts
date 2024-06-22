import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  BalanceChangedStatus,
  EventBalanceChangedData,
  EventNameEnum,
  EventTransactionSavedData,
  TransactionStatus,
  TransactionType,
} from './transaction.types';
import { TransactionDto } from './dto/transaction.dto';
import { GetTransactionFilterDto } from './dto/get-transaction-filter.dto';
import { InternalAccountService } from '../../internal/account/account.service';
import { KafkaService } from '../../config/kafka/kafka.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    //@InjectDataSource() private readonly dataSource: DataSource,
    private readonly internalAccountService: InternalAccountService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(params: CreateTransactionDto): Promise<void> {
    const { userId, amount, transactionType, recipient } = params;
    if (transactionType == TransactionType.TRANSFER && recipient) {
      return this.createTransferTransaction(params);
    }
    const transaction = await this.transactionRepository.creteTransaction({
      userId,
      amount,
      type: transactionType,
    });

    const data: EventTransactionSavedData = {
      userId,
      amount,
      transactionId: transaction.transactionId,
      transactionType,
    };
    await this.kafkaService.produce({
      eventName: EventNameEnum.TransactionSaved,
      data,
    });
  }

  private async createTransferTransaction(
    params: CreateTransactionDto,
  ): Promise<void> {
    const { userId, amount, transactionType, recipient } = params;
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.startTransaction('SERIALIZABLE');
    const transWithdrawl = await this.transactionRepository.creteTransaction({
      userId,
      amount: '-' + amount,
      type: transactionType,
    });
    const dataWithdrawl: EventTransactionSavedData = {
      userId,
      amount,
      transactionType: TransactionType.WITHDRAWL,
      transactionId: transWithdrawl.transactionId,
      fromId: transWithdrawl.transactionId,
    };

    const transDeposit = await this.transactionRepository.creteTransaction({
      userId: recipient,
      amount: amount,
      type: transactionType,
    });
    const dataDeposit: EventTransactionSavedData = {
      userId: recipient,
      amount,
      transactionType: TransactionType.DEPOSIT,
      transactionId: transDeposit.transactionId,
      fromId: transWithdrawl.transactionId,
    };
    await this.kafkaService.produce({
      eventName: EventNameEnum.TransactionSaved,
      data: dataWithdrawl,
    });
    await this.kafkaService.produce({
      eventName: EventNameEnum.TransactionSaved,
      data: dataDeposit,
    });
    // await queryRunner.commitTransaction();
    // await queryRunner.release();
  }

  async updateStatus(params: EventBalanceChangedData): Promise<void> {
    const { transactionId, status } = params;
    let transactionStatus = TransactionStatus.COMPLETED;
    if (status == BalanceChangedStatus.FAILED) {
      transactionStatus = TransactionStatus.FAILED;
    }
    await this.transactionRepository.updateStatus(
      transactionId,
      transactionStatus,
    );
  }

  async getTransaction(id: string): Promise<TransactionDto> {
    return this.transactionRepository.findById(id);
  }

  async getTransactions(
    params: GetTransactionFilterDto,
  ): Promise<{ items: TransactionDto[]; total: number }> {
    return this.transactionRepository.findByParams(params);
  }
}

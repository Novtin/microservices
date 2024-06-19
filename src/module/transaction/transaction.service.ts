import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from './transaction.types';
import { TransactionDto } from './dto/transaction.dto';
import { GetTransactionFilterDto } from './dto/get-transaction-filter.dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(params: CreateTransactionDto): Promise<void> {
    const { userId, amount, transactionType, recipient } = params;
    if (transactionType == TransactionType.TRANSFER && recipient) {
      return this.createTransferTransaction(params);
    }
    await this.transactionRepository.creteTransaction({
      userId,
      amount,
      type: transactionType,
    });
  }

  private async createTransferTransaction(
    params: CreateTransactionDto,
  ): Promise<void> {
    const { userId, amount, transactionType, recipient } = params;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      await this.transactionRepository.creteTransaction({
        userId,
        amount: '-' + amount,
        type: transactionType,
      });
      await this.transactionRepository.creteTransaction({
        userId: recipient,
        amount: amount,
        type: transactionType,
      });
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
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

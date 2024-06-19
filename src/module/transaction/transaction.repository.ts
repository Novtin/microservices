import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { FindTransactionParams } from './transaction.types';
import { TransactionDto } from './dto/transaction.dto';

export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async creteTransaction<T extends DeepPartial<TransactionEntity>>(
    entity: T,
  ): Promise<TransactionEntity> {
    return this.transactionRepository.save(entity);
  }

  async findById(id: string) {
    return this.transactionRepository.findOneBy({ transactionId: id });
  }

  async findByParams(
    params: FindTransactionParams,
  ): Promise<{ items: TransactionDto[]; total: number }> {
    const [items, total] = await this.qb(params).getManyAndCount();
    return { items, total };
  }

  qb(
    params: FindTransactionParams = {},
    alias = 'transaction',
  ): SelectQueryBuilder<TransactionEntity> {
    console.log(params);
    const query = this.transactionRepository.createQueryBuilder(alias);
    const { userIds, transactionIds, amounts, type, take, skip } = params;
    if (userIds?.length) {
      query.andWhere(`${alias}.userId in (:...userIds)`, { userIds });
    }
    if (transactionIds?.length) {
      query.andWhere(`${alias}.transactionId in (:...transactionIds)`, {
        transactionIds,
      });
    }
    if (amounts?.length) {
      query.andWhere(`${alias}.amount in (:...amounts)`, { amounts });
    }
    if (type) {
      query.andWhere(`${alias}.type = :type`, { type });
    }
    if (take) {
      query.take(take);
    }
    if (skip) {
      query.skip(skip);
    }
    return query;
  }
}

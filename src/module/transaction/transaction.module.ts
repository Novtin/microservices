import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';
import { DatabaseModule } from '../database/database.module';
import { InternalAccountModule } from '../../internal/account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { KafkaModule } from '../../config/kafka/kafka.module';
import { TransactionKafkaController } from './transaction.kafka-controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    DatabaseModule,
    InternalAccountModule,
    KafkaModule,
  ],
  controllers: [TransactionController, TransactionKafkaController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}

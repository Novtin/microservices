import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, TransactionModule],
})
export class AppModule {}

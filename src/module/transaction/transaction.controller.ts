import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionDto } from './dto/transaction.dto';
import { GetTransactionFilterDto } from './dto/get-transaction-filter.dto';

@Controller()
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async crete(@Body() dto: CreateTransactionDto): Promise<void> {
    return await this.transactionService.create(dto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<TransactionDto> {
    return this.transactionService.getTransaction(id);
  }

  @Get()
  async findByParams(
    @Query() dto: GetTransactionFilterDto,
  ): Promise<{ items: TransactionDto[]; total: number }> {
    return this.transactionService.getTransactions(dto);
  }
}

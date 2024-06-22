import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
  async create(@Body() dto: CreateTransactionDto): Promise<void> {
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

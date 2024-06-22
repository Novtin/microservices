import { TransactionStatus, TransactionType } from '../transaction.types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class GetTransactionFilterDto {
  @ApiProperty({
    description: 'Идентификаторы пользователей',
    required: false,
    type: [String],
  })
  @IsString({
    each: true,
  })
  @IsOptional()
  userIds?: string[];

  @ApiProperty({
    description: 'Идентификаторы транзакций',
    required: false,
    type: [String],
  })
  @IsString({
    each: true,
  })
  @IsOptional()
  transactionIds?: string[];

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;

  @ApiProperty({
    description: 'Сумма',
    required: false,
    type: [String],
  })
  @IsString({
    each: true,
  })
  @IsOptional()
  amounts?: string[];

  @ApiProperty({
    description: 'Статус транзакции',
    required: false,
    enum: TransactionStatus,
  })
  @IsEnum(TransactionStatus)
  @Expose()
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty({
    description: 'Сколько нужно взять записей',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly take?: number;

  @ApiProperty({
    description: 'Сколько нужно пропустить записей',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly skip?: number;
}

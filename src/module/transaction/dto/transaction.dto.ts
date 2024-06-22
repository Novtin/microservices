import { TransactionStatus, TransactionType } from '../transaction.types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({
    description: 'Идентификатор транзакции',
    type: String,
  })
  @IsString()
  @Expose()
  transactionId: string;

  @ApiProperty({
    description: 'Идентификатор пользователя, совершающего транзакцию',
    type: String,
  })
  @IsString()
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Сумма транзакции в копейках',
    type: String,
  })
  @IsString()
  @Expose()
  amount: string;

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  @Expose()
  @IsOptional()
  type?: TransactionType;

  @ApiProperty({
    description: 'Статус транзакции',
    required: false,
    enum: TransactionStatus,
  })
  @IsEnum(TransactionStatus)
  @Expose()
  @IsOptional()
  status?: TransactionStatus;
}

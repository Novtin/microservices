import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { TransactionType } from '../transaction.types';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Идентификатор пользователя, совершающего транзакцию',
    type: String,
  })
  @IsString()
  @Expose()
  @Type(() => String)
  userId: string;

  @ApiProperty({
    description: 'Сумма транзакции в копейках',
    type: String,
  })
  @IsString()
  @Expose()
  @Type(() => String)
  amount: string;

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  @Expose()
  @IsOptional()
  transactionType?: TransactionType;

  @ApiProperty({
    description: 'Идентификатор получателя, если это перевод средств',
    required: false,
    type: String,
  })
  @IsString()
  @Expose()
  @IsOptional()
  @Type(() => String)
  recipient?: string;
}

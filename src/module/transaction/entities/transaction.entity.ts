import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { TransactionStatus, TransactionType } from "../transaction.types";

@Entity({
  name: 'transaction_table',
})
export class TransactionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'transaction_id',
    comment: 'Идентификатор транзакции',
  })
  readonly transactionId: string;

  @Column('varchar', {
    name: 'user_id',
    comment: 'Идентификатор пользователя, совершающего транзакцию',
    nullable: false,
  })
  userId: string;

  @Column('varchar', {
    name: 'amount',
    comment: 'Сумма транзакции в копейках',
    nullable: false,
  })
  amount: string;

  @Column('enum', {
    name: 'type',
    comment: 'Тип транзакции',
    nullable: false,
    enum: TransactionType,
  })
  type: TransactionType;

  @Column('enum', {
    name: 'status',
    comment: 'Статус транзакции',
    nullable: false,
    enum: TransactionStatus,
    default: TransactionStatus.INPROGRESS,
  })
  status?: TransactionStatus;
}

export enum TransactionType {
  WITHDRAWL = 'WITHDRAWL',
  DEPOSIT = 'DEPOSIT',
  TRANSFER = 'TRANSFER',
}

export type FindTransactionParams = {
  userIds?: string[];
  transactionIds?: string[];
  type?: TransactionType;
  amounts?: string[];
  take?: number;
  skip?: number;
};

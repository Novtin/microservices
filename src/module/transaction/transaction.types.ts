export enum TransactionType {
  WITHDRAWL = 'WITHDRAWL',
  DEPOSIT = 'DEPOSIT',
  TRANSFER = 'TRANSFER',
}

export type FindTransactionParams = {
  userIds?: string[];
  transactionIds?: string[];
  type?: TransactionType;
  status?: TransactionStatus;
  amounts?: string[];
  take?: number;
  skip?: number;
};

export enum TransactionStatus {
  INPROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum BalanceChangedStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type EventTransactionSavedData = {
  userId: string;
  amount: string;
  transactionId: string;
  transactionType: TransactionType;
  fromId?: string;
};

export type EventBalanceChangedData = {
  transactionId: string;
  status: BalanceChangedStatus;
};

export enum EventNameEnum {
  TransactionSaved = 'TransactionSaved',
  BalanceChanged = 'BalanceChanged',
}

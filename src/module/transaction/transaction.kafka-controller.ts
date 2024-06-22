import { TransactionService } from './transaction.service';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventBalanceChangedData, EventNameEnum } from './transaction.types';

@Controller()
export class TransactionKafkaController {
  constructor(private readonly transactionService: TransactionService) {}

  @EventPattern(EventNameEnum.BalanceChanged)
  async handleTransactionSaved(
    @Payload() message: EventBalanceChangedData,
  ): Promise<void> {
    await this.transactionService.updateStatus(message);
  }
}

import { TransactionService } from './transaction.service';
import { KafkaService } from '../../config/kafka/kafka.service';
import { TransactionRepository } from './transaction.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { InternalAccountService } from '../../internal/account/account.service';
import { mock } from 'jest-mock-extended';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from './transaction.types';
import { TransactionEntity } from './entities/transaction.entity';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let kafkaService: KafkaService;
  let transactionRepository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            createTransaction: jest.fn(),
          },
        },
        {
          provide: InternalAccountService,
          useValue: mock<InternalAccountService>,
        },
        {
          provide: KafkaService,
          useValue: {
            produce: jest.fn(),
          },
        },
      ],
    }).compile();
    transactionService = module.get(TransactionService);
    transactionRepository = module.get(TransactionRepository);
    kafkaService = module.get(KafkaService);
  });
  describe('create', () => {
    it('should create transaction', async () => {
      // Моки для transactionRepository.createTransaction и kafkaService.produce
      const createTransactionDto: CreateTransactionDto = {
        amount: '100',
        userId: 'userId',
        transactionType: TransactionType.DEPOSIT,
      };
      const createTransaction: TransactionEntity = {
        transactionId: 'id',
        amount: '100',
        userId: 'userId',
        type: TransactionType.DEPOSIT,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Моки для методов, которые вызываются в transactionService.create
      jest
        .spyOn(transactionRepository, 'creteTransaction')
        .mockResolvedValue(createTransaction);
      jest.spyOn(kafkaService, 'produce').mockImplementation();

      await transactionService.create(createTransactionDto);
      expect(transactionRepository.creteTransaction).toHaveBeenCalledWith({
        amount: createTransactionDto.amount,
        userId: createTransactionDto.userId,
        transactionType: createTransactionDto.transactionType,
      });
      expect(kafkaService.produce).toHaveBeenCalledWith({
        transactionId: createTransaction.transactionId,
        amount: createTransactionDto.amount,
        userId: createTransactionDto.userId,
        transactionType: createTransactionDto.transactionType,
      });
    });
  });
});

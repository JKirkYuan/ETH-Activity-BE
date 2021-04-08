import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Interval } from '@nestjs/schedule';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionRepository } from './entities/transaction.repository';
import { handleScrape, TransactionResponse } from './scrape/handle-scrape';
import { FilterTransactionsDto } from './dto/get-transactions.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  @Interval(600000)
  async handleInterval() {
    const result: TransactionResponse[] = await handleScrape();

    for (let i = 0; i < result.length; i++) {
      if (result[i].from !== result[i].to) {
        const transaction: CreateTransactionDto = {
          txnDate: result[i].date,
          eth: result[i].eth,
        };
        await this.transactionRepository.createTransaction(
          transaction,
          result[i].block,
          result[i].from,
          result[i].to,
        );
      }
    }
  }

  create(
    createTransactionDto: CreateTransactionDto,
    block: number,
    from: string,
    to: string,
  ) {
    return this.transactionRepository.createTransaction(
      createTransactionDto,
      block,
      from,
      to,
    );
  }

  async findAll(
    filterTransactions: FilterTransactionsDto,
  ): Promise<Transaction[]> {
    const { limit, offset, block, address, timeline } = filterTransactions;
    let transactionKey = 'transactions';

    if (timeline === '1') {
      transactionKey = 'transactions1';
    }

    if (timeline === '3') {
      transactionKey = 'transactions3';
    }

    if (timeline === '5') {
      transactionKey = 'transactions5';
    }

    if (timeline === '30') {
      transactionKey = 'transactions30';
    }

    if (limit) {
      transactionKey + limit;
    }

    if (offset) {
      transactionKey + offset;
    }

    if (block) {
      transactionKey + block;
    }

    if (address) {
      transactionKey + address;
    }

    let value: Transaction[] = await this.cacheManager.get(transactionKey);

    if (!value) {
      try {
        value = await this.transactionRepository.getAllTransactions(
          filterTransactions,
        );
      } catch (e) {
        throw new InternalServerErrorException();
      }

      if (value.length > 0) {
        await this.cacheManager.set(transactionKey, value, { ttl: 900 });
      }
    }

    return value;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interval } from '@nestjs/schedule';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionRepository } from './entities/transaction.repository';
import { handleScrape, TransactionResponse } from './scrape/handle-scrape';
import { FilterTransactionsDto } from './dto/get-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
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

  findAll(filterTransactions: FilterTransactionsDto) {
    return this.transactionRepository.getAllTransactions(filterTransactions);
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}

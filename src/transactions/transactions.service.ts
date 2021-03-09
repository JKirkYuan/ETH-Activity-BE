import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interval } from '@nestjs/schedule';
import * as scrapeIt from 'scrape-it';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './entities/transaction.repository';
import { handleScrape, TransactionResponse } from './scrape/handle-scrape';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  @Interval(10000)
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

  findAll() {
    return this.transactionRepository.getAllTransactions();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}

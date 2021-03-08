import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interval } from '@nestjs/schedule';
import * as scrapeIt from 'scrape-it';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './entities/transaction.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}
  private readonly logger = new Logger(TransactionsService.name);

  @Interval(10000)
  async handleInterval() {
    scrapeIt('https://etherscan.io/txs?ps=100&p=1', {
      transactions: {
        listItem: '.table > tbody > tr',
        data: {
          date: '.showDate',
          eth: 'td:nth-last-child(2)',
          // hash: '.myFnExpandBox_searchVal',
          block: '.d-none > a',
          from: 'td:nth-child(6) ',
          to: 'td:nth-child(8)',
        },
      },
    }).then(({ data, response }) => {
      console.log(`Status Code: ${response.statusCode}`);
      const result: any = data;

      console.log(result.transactions[0]);
      const transaction: CreateTransactionDto = {
        txnDate: result.transactions[0].date,
        eth: result.transactions[0].eth,
      };
      this.transactionRepository.createTransaction(
        transaction,
        result.transactions[0].block,
        result.transactions[0].from,
        result.transactions[0].to,
      );
    });
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

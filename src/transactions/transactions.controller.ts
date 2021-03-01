import { Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsServer: TransactionsService) {}

  @Get('/')
  async getTransactions() {
    // const transactions = await this.transactionsServer.getAllTransactions();
    // return transactions;
  }

  @Post('/')
  createTransaction() {
    // return this.transactionsServer.createTransaction();
  }
}

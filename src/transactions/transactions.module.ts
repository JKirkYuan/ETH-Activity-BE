import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}

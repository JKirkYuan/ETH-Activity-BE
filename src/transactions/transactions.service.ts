import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  // constructor(
  //   @InjectModel(Transaction.name)
  //   private transactionModel: Model<TransactionDocument>,
  // ) {}
  // async getAllTransactions(): Promise<Transaction[]> {
  //   return await this.transactionModel.find().exec();
  // }
  // async createTransaction(): Promise<Transaction> {
  //   const created = new this.transactionModel({
  //     from: 'abc',
  //     to: 'aa',
  //     block: 1207512,
  //     hash: 'dd',
  //   });
  //   return created.save();
  // }
}

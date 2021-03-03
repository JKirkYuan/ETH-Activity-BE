import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { Block } from 'src/blocks/entities/block.entity';
import { BlockRepository } from 'src/blocks/entities/block.repository';
import { Address } from 'src/addresses/entities/address.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async getAllTransactions(): Promise<Transaction[]> {
    const transactions = await this.find({
      relations: ['block'],
    });
    return transactions;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const blockRepo = getCustomRepository(BlockRepository);
    const { txnDate, eth, block, addresses } = createTransactionDto;
    const transaction = new Transaction();
    let currBlock = await blockRepo.getBlock(block);

    transaction.txnDate = txnDate;
    transaction.eth = eth;

    const addr1 = new Address();
    addr1.hash = addresses[0];
    addr1.name = addresses[0];
    await addr1.save();
    const addr2 = new Address();
    addr2.hash = addresses[1];
    addr2.name = addresses[1];
    await addr2.save();

    transaction.addresses = [addr1, addr2];

    if (!currBlock) {
      currBlock = new Block();
      currBlock.blockNumber = block;
      currBlock.createdAt = new Date();
      transaction.block = currBlock;
      await currBlock.save();
      await transaction.save();
    } else {
      transaction.block = currBlock;
      await currBlock.save();
      await transaction.save();
    }

    delete transaction.block;

    return transaction;
  }
}

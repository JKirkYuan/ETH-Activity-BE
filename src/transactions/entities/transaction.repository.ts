import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { Block } from 'src/blocks/entities/block.entity';
import { BlockRepository } from 'src/blocks/entities/block.repository';
import { Address } from 'src/addresses/entities/address.entity';
import { AddressRepository } from 'src/addresses/entities/address.repository';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async getAllTransactions(): Promise<Transaction[]> {
    const transactions = await this.find({
      relations: ['block', 'addresses'],
    });
    return transactions;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    block: number,
    from: string,
    to: string,
  ): Promise<Transaction> {
    const blockRepo = getCustomRepository(BlockRepository);
    const addrRepo = getCustomRepository(AddressRepository);

    const { txnDate, eth } = createTransactionDto;
    const transaction = new Transaction();
    let currBlock = await blockRepo.getBlock(block);
    let fromAddr = await addrRepo.getAddress(from);
    let toAddr = await addrRepo.getAddress(to);

    transaction.txnDate = txnDate;
    transaction.eth = eth;

    if (!fromAddr) {
      fromAddr = new Address();
      fromAddr.name = from;
      fromAddr.hash = from;
      await fromAddr.save();
    }

    if (!toAddr) {
      toAddr = new Address();
      toAddr.name = to;
      toAddr.hash = to;
      await toAddr.save();
    }

    transaction.addresses = [fromAddr, toAddr];

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

    return transaction;
  }
}

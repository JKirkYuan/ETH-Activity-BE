import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { Block } from 'src/blocks/entities/block.entity';
import { BlockRepository } from 'src/blocks/entities/block.repository';
import { Address } from 'src/addresses/entities/address.entity';
import { AddressRepository } from 'src/addresses/entities/address.repository';
import { FilterTransactionsDto } from '../dto/get-transactions.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async getAllTransactions(
    filterTransactions: FilterTransactionsDto,
  ): Promise<Transaction[]> {
    const { limit, block, address } = filterTransactions;

    const query = this.createQueryBuilder('transaction');

    query.leftJoinAndSelect('transaction.block', 'block');

    if (limit) {
      query.take(limit);
    }

    if (block) {
      query.andWhere('block.blockNumber = :block', { block });
    }

    if (address) {
      query
        .leftJoinAndSelect('transaction.addresses', 'addresses')
        .where('addresses.hash LIKE :address', { address });
    } else {
      query.leftJoinAndSelect('transaction.addresses', 'addresses');
    }

    try {
      const transactions = await query.getMany();
      return transactions;
    } catch (error) {
      throw new InternalServerErrorException();
    }
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
      fromAddr.hash = from;
    }

    if (!toAddr) {
      toAddr = new Address();
      toAddr.hash = to;
    }

    transaction.addresses = [fromAddr, toAddr];

    if (!currBlock) {
      currBlock = new Block();
      currBlock.blockNumber = block;
      currBlock.createdAt = new Date();
      transaction.block = currBlock;
    } else {
      transaction.block = currBlock;
    }

    await transaction.save();

    return transaction;
  }
}

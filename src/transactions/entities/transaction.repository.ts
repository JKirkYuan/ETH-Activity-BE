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
    const { limit, block, address, timeline } = filterTransactions;

    const query = this.createQueryBuilder('transaction');

    query.leftJoinAndSelect('transaction.block', 'block');
    query.leftJoinAndSelect('transaction.addresses', 'addresses');

    if (timeline) {
      const date = new Date('04-04-2021');

      if (timeline === '1') {
        date.setDate(date.getDate() - 1);
        query.where('transaction.txnDate >= :date', { date });
      }

      if (timeline === '3') {
        date.setDate(date.getDate() - 3);
        query.where('transaction.txnDate >= :date', { date });
      }

      if (timeline === '5') {
        date.setDate(date.getDate() - 5);
        query.where('transaction.txnDate >= :date', { date });
      }

      if (timeline === '30') {
        date.setDate(date.getDate() - 30);
        query.where('transaction.txnDate >= :date', { date });
      }
    }

    if (limit) {
      query.take(limit);
    }

    if (block) {
      query.andWhere('block.blockNumber = :block', { block });
    }

    if (address) {
      query.where('addresses.hash = :address', { address });
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

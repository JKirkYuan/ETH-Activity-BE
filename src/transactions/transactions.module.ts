import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionRepository } from './entities/transaction.repository';
import { AddressRepository } from 'src/addresses/entities/address.repository';
import { BlockRepository } from 'src/blocks/entities/block.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionRepository,
      AddressRepository,
      BlockRepository,
    ]),
    CacheModule.register(),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}

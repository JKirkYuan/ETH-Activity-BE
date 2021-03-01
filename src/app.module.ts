import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { BlocksModule } from './blocks/blocks.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [TransactionsModule, BlocksModule, AddressesModule],
})
export class AppModule {}

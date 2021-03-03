import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigDev, typeOrmConfigProd } from './config/typeorm.config';
import { BlocksModule } from './blocks/blocks.module';
import { AddressesModule } from './addresses/addresses.module';
import { TransactionsModule } from './transactions/transactions.module';

const typeOrmConfig =
  process.env.NODE_ENV === 'production' ? typeOrmConfigProd : typeOrmConfigDev;

@Module({
  imports: [
    TransactionsModule,
    BlocksModule,
    AddressesModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}

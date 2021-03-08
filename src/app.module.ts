import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { typeOrmConfigDev, typeOrmConfigProd } from './config/typeorm.config';
import { BlocksModule } from './blocks/blocks.module';
import { AddressesModule } from './addresses/addresses.module';
import { TransactionsModule } from './transactions/transactions.module';

const typeOrmConfig =
  process.env.NODE_ENV === 'production' ? typeOrmConfigProd : typeOrmConfigDev;

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    TransactionsModule,
    BlocksModule,
    AddressesModule,
  ],
})
export class AppModule {}

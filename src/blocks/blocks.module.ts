import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { BlockRepository } from './entities/block.repository';
import { TransactionRepository } from 'src/transactions/entities/transaction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionRepository, BlockRepository])],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}

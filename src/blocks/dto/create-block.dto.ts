import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export class CreateBlockDto {
  @IsNotEmpty()
  blockNumber: number;

  @IsNotEmpty()
  createdAt: Date;

  @Optional()
  transactions: Transaction[];
}

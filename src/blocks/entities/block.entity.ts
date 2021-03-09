import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Entity()
@Unique(['blockNumber'])
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blockNumber: number;

  @Column()
  createdAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.block)
  transactions: Transaction[];
}

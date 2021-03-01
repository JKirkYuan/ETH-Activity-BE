import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalTxns: number;

  @Column()
  createdAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.block)
  transactions: Transaction[];
}

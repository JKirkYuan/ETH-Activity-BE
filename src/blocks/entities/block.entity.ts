import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Entity()
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  blockNumber: number;

  @Column()
  createdAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.block, {
    cascade: true,
  })
  transactions: Transaction[];
}

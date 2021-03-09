import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Unique,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
@Unique(['hash'])
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @ManyToMany(() => Transaction, (transaction) => transaction.addresses)
  transactions: Transaction[];
}

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  // OneToOne,
} from 'typeorm';
// import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  hash: string;
}

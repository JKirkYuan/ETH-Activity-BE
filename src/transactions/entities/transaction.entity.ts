import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Block } from '../../blocks/entities/block.entity';
import { Address } from '../../addresses/entities/address.entity';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  txnDate: Date;

  @Column()
  eth: number;

  @ManyToOne(() => Block, (block) => block.transactions)
  block: Block;

  @OneToOne(() => Address, (address) => address.transaction)
  address: Address;
}

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Block } from 'src/blocks/entities/block.entity';
import { Address } from 'src/addresses/entities/address.entity';

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

  @ManyToMany(() => Address)
  @JoinTable()
  addresses: Address[];
}

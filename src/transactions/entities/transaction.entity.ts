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
  eth: string;

  @ManyToOne(() => Block, (block) => block.transactions, { cascade: true })
  block: Block;

  @ManyToMany(() => Address, (address) => address.transactions, {
    cascade: true,
  })
  @JoinTable()
  addresses: Address[];
}

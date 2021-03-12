import { EntityRepository, Repository } from 'typeorm';
import { CreateBlockDto } from '../dto/create-block.dto';
import { FilterBlocksDto } from '../dto/get-blocks.dto';
import { Block } from './block.entity';

@EntityRepository(Block)
export class BlockRepository extends Repository<Block> {
  async getAllBlocks(filterBlocks: FilterBlocksDto): Promise<Block[]> {
    const { block, limit } = filterBlocks;
    const query = this.createQueryBuilder('block');

    query.leftJoinAndSelect('block.transactions', 'transactions');

    if (block) {
      query.where('block.blockNumber = :block', { block });
    }

    if (limit) {
      query.take(limit);
    }

    return await query.getMany();
  }

  async getBlock(blockNumber): Promise<Block> {
    const block = await this.findOne({
      where: {
        blockNumber: blockNumber,
      },
    });
    return block;
  }

  async createBlock(createBlockDto: CreateBlockDto): Promise<Block> {
    const { blockNumber, createdAt } = createBlockDto;
    const block = new Block();
    block.blockNumber = blockNumber;
    block.createdAt = createdAt;
    await block.save();
    return block;
  }
}

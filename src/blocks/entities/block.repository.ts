import { EntityRepository, Repository } from 'typeorm';
import { CreateBlockDto } from '../dto/create-block.dto';
import { Block } from './block.entity';

@EntityRepository(Block)
export class BlockRepository extends Repository<Block> {
  async getAllBlocks(): Promise<Block[]> {
    const blocks = await this.find({
      relations: ['transactions'],
    });
    return blocks;
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

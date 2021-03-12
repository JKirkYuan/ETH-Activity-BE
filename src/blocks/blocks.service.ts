import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlockDto } from './dto/create-block.dto';
import { FilterBlocksDto } from './dto/get-blocks.dto';
import { BlockRepository } from './entities/block.repository';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(BlockRepository)
    private blockRepository: BlockRepository,
  ) {}

  create(createBlockDto: CreateBlockDto) {
    return this.blockRepository.createBlock(createBlockDto);
  }

  findAll(filterBlocks: FilterBlocksDto) {
    return this.blockRepository.getAllBlocks(filterBlocks);
  }

  findOne(id: number) {
    return `This action returns a #${id} block`;
  }
}

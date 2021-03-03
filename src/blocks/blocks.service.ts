import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
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

  findAll() {
    return this.blockRepository.getAllBlocks();
  }

  findOne(id: number) {
    return `This action returns a #${id} block`;
  }

  update(id: number, updateBlockDto: UpdateBlockDto) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}

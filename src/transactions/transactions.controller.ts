import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetAddresses } from 'src/addresses/getAddresses.decorator';
import { GetBlock } from 'src/blocks/getBlock.decorator';
import { FilterTransactionsDto } from './dto/get-transactions.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @GetBlock() block: number,
    @GetAddresses() addresses: string[],
  ) {
    const from = addresses[0];
    const to = addresses[1];
    return this.transactionsService.create(
      createTransactionDto,
      block,
      from,
      to,
    );
  }

  @Get()
  findAll(@Query(ValidationPipe) filterTransactions: FilterTransactionsDto) {
    return this.transactionsService.findAll(filterTransactions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }
}

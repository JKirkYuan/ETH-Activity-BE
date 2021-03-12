import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { FilterAddressesDto } from './dto/get-addresses.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  findAll(@Query(ValidationPipe) filterAddresses: FilterAddressesDto) {
    return this.addressesService.findAll(filterAddresses);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id);
  }
}

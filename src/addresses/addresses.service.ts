import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { FilterAddressesDto } from './dto/get-addresses.dto';
import { AddressRepository } from './entities/address.repository';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
  ) {}

  create(createAddressDto: CreateAddressDto) {
    return this.addressRepository.createAddress(createAddressDto);
  }

  findAll(filterAddresses: FilterAddressesDto) {
    return this.addressRepository.getAllAddresses(filterAddresses);
  }

  findOne(id: number) {
    return this.addressRepository.find({
      where: { id },
      relations: ['transactions'],
    });
  }
}

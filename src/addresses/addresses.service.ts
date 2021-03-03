import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
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

  findAll() {
    return this.addressRepository.getAllAddresses();
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}

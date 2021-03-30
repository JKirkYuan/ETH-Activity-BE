import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { FilterAddressesDto } from './dto/get-addresses.dto';
import { AddressRepository } from './entities/address.repository';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  create(createAddressDto: CreateAddressDto) {
    return this.addressRepository.createAddress(createAddressDto);
  }

  async findAll(filterAddresses: FilterAddressesDto) {
    const { hash } = filterAddresses;

    let key = 'all';

    if (!!hash) {
      key = hash;
    }

    let value: Address[] = await this.cacheManager.get(key);

    if (!value) {
      try {
        value = await this.addressRepository.getAllAddresses(filterAddresses);
      } catch (e) {
        throw new InternalServerErrorException();
      }

      await this.cacheManager.set(key, value, { ttl: 200 });
    }

    return value;
  }

  findOne(id: number) {
    return this.addressRepository.find({
      where: { id },
      relations: ['transactions'],
    });
  }
}

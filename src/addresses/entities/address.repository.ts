import { EntityRepository, Repository } from 'typeorm';
import { CreateAddressDto } from '../dto/create-address.dto';
import { FilterAddressesDto } from '../dto/get-addresses.dto';
import { Address } from './address.entity';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async getAllAddresses(
    filterAddresses: FilterAddressesDto,
  ): Promise<Address[]> {
    const { hash, limit } = filterAddresses;
    const query = this.createQueryBuilder('address');

    query.innerJoinAndSelect('address.transactions', 'transactions');

    if (hash) {
      query.where('address.hash = :address', { address: hash });
    }

    if (limit) {
      query.take(limit);
    }

    return await query.getMany();
  }

  async getAddress(hash): Promise<Address> {
    const address = await this.findOne({
      where: {
        hash: hash,
      },
    });
    return address;
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { hash } = createAddressDto;
    const address = new Address();
    address.hash = hash;
    await address.save();
    return address;
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { CreateAddressDto } from '../dto/create-address.dto';
import { Address } from './address.entity';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async getAllAddresses(): Promise<Address[]> {
    const addresses = await this.find({ relations: ['transactions'] });
    return addresses;
  }

  async getAddress(name): Promise<Address> {
    const address = await this.findOne({
      where: {
        name: name,
      },
    });
    return address;
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { name, hash } = createAddressDto;
    const address = new Address();
    address.name = name;
    address.hash = hash;
    await address.save();
    return address;
  }
}

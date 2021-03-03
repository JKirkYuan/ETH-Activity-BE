import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { AddressRepository } from './entities/address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}

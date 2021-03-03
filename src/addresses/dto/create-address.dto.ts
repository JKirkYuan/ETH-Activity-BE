import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  hash: string;
}

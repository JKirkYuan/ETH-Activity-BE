import { IsOptional, IsNotEmpty } from 'class-validator';

export class FilterAddressesDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  address: string;
}

import { IsOptional, IsNotEmpty } from 'class-validator';

export class FilterBlocksDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  block: string;
}

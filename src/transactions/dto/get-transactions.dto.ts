import { IsOptional, IsNotEmpty } from 'class-validator';

export class FilterTransactionsDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  offset: Date;

  @IsOptional()
  @IsNotEmpty()
  block: string;

  @IsOptional()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsNotEmpty()
  timeline: string;
}

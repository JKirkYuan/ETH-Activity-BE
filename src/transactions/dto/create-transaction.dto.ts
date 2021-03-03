import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  txnDate: Date;

  @IsNotEmpty()
  eth: number;

  @IsNotEmpty()
  block: number;

  @IsNotEmpty()
  addresses: string[];
}

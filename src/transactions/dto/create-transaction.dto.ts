import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  txnDate: Date;

  @IsNotEmpty()
  eth: string;
}

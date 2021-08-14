import { IsNotEmpty } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  name: string;
}

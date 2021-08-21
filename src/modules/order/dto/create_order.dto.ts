import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class OrderDetailDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(99)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  note: string;

  @IsNotEmpty()
  @IsNumber()
  paymentId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  items: OrderDetailDto[];
}

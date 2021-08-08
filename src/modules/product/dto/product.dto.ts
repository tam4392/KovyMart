import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sku: string;

  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  unit: string;

  discount: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  supplierId: number;
}

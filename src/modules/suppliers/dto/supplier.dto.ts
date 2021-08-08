import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class SupplierDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

//   @IsNumber()
//   @IsNotEmpty()
//   provinceId: number;

//   @IsNumber()
//   @IsNotEmpty()
//   districtId: number;

//   @IsNumber()
//   @IsNotEmpty()
//   wardId: number;
}

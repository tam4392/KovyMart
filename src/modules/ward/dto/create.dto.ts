import { IsNotEmpty,IsNumber,IsString } from 'class-validator';

export class CreateWardsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  districtId: number;
}

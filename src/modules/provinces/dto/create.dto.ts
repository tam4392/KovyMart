import { IsNotEmpty } from 'class-validator';

export class CreateProvincesDto {
  @IsNotEmpty()
  name: string;
}

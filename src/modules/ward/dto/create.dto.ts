import { IsNotEmpty } from 'class-validator';

export class CreateWardsDto {
  @IsNotEmpty()
  name: string;
}

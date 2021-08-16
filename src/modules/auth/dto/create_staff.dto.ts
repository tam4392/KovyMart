import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { errorsKey } from '../../../config/errors_key';

export class CreateStaffDto {
  @IsEmail({}, { message: errorsKey.users.email_format })
  @IsNotEmpty({ message: errorsKey.is_empty })
  email: string;

  @IsNotEmpty({ message: errorsKey.is_empty })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: errorsKey.users.password_weak,
  })
  password: string;
  @IsNotEmpty()
  firstName: string
  @IsNotEmpty()
  lastName: string
  @IsNotEmpty()
  phone: string
  @IsNotEmpty()
  gender:boolean
  @IsNotEmpty()
  birthday: Date
}

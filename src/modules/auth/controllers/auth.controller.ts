import { AuthCredentialDto } from './../dto/auth_credential.dto';
import { CreateCustomerDto } from '../dto/create_customer.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() createCustomerDto: CreateCustomerDto): Promise<any> {
    return this.authService.signUp(createCustomerDto);
  }

  @Post('/sign-in')
  signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<any> {
    return this.authService.signIn(authCredentialDto);
  }
}

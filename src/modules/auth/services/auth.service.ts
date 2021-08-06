import { CustomerService } from './../../customer/service/customer.service';
import { JwtPayload } from './../dto/jwt_payload.interface';
import { AuthCredentialDto } from './../dto/auth_credential.dto';
import { errorsKey } from './../../../config/errors_key';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create_customer.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService,
  ) {}

  async signUp(createCustomerDto: CreateCustomerDto): Promise<any> {
    return await this.customerService.create(createCustomerDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<any> {
    const { email, password } = authCredentialDto;
    const customer = await this.customerService.findByEmail(email);
    const isCompare: boolean = await bcrypt.compare(
      password,
      customer.password,
    );
    if (customer && isCompare) {
      delete customer.password;
      const payload: JwtPayload = { customer };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException(errorsKey.users.auth_credential_wrong);
    }
  }
}

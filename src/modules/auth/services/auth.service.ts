import { CustomerService } from './../../customer/service/customer.service';
import { StaffService } from '../../staff/service/staff.service';
import { JwtPayload,JwtStaffPayload } from './../dto/jwt_payload.interface';
import { AuthCredentialDto } from './../dto/auth_credential.dto';
import { errorsKey } from './../../../config/errors_key';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create_customer.dto';
import { CreateStaffDto } from '../dto/create_staff.dto';
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
@Injectable()
export class AuthStaffService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly staffService: StaffService,
  ) {}

  async signUp(createStaffDto: CreateStaffDto): Promise<any> {
    return await this.staffService.create(createStaffDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<any> {
    const { email, password } = authCredentialDto;
    const staff = await this.staffService.findByEmail(email);
    const isCompare: boolean = await bcrypt.compare(
      password,
      staff.password,
    );
    if (staff && isCompare) {
      delete staff.password;
      const payload: JwtStaffPayload = { staff };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException(errorsKey.users.auth_credential_wrong);
    }
  }
}

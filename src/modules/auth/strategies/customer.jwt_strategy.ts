import { CustomerService } from '../../customer/service/customer.service';
import { Customer } from '../../customer/entities/customer.entity';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../dto/jwt_payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { errorsKey } from '../../../config/errors_key';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-customer',
) {
  constructor(
    private readonly customerService: CustomerService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<Customer> {
    const { customer } = payload;
    const email = customer.email;
    const customerItem: Customer = await this.customerService.findByEmail(
      email,
    );
    if (!customerItem) {
      throw new UnauthorizedException(errorsKey.users.auth_credential_wrong);
    }
    delete customerItem.password;
    return customerItem;
  }
}

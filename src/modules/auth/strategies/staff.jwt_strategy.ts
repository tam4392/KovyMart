import { StaffService } from '../../staff/service/staff.service';
import { Staff } from '../../staff/entities/staff.entity';
import { ConfigService } from '@nestjs/config';
import { JwtStaffPayload } from '../dto/jwt_payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { errorsKey } from '../../../config/errors_key';

@Injectable()
export class StaffJwtStrategy extends PassportStrategy(Strategy, 'jwt-staff') {
  constructor(
    private readonly staffService: StaffService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtStaffPayload): Promise<Staff> {
    const { staff } = payload;
    const email = staff.email;
    const staffItem: Staff = await this.staffService.findByEmail(email);
    if (!staffItem) {
      throw new UnauthorizedException(errorsKey.users.auth_credential_wrong);
    }
    delete staffItem.password;
    return staffItem;
  }
}

import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './../dto/jwt_payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { errorsKey } from './../../../config/errors_key';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { user } = payload;
    const email = user.email;
    const userItem: User = await this.usersRepository.findOne({ email });
    if (!userItem) {
      throw new UnauthorizedException(errorsKey.users.auth_credential_wrong);
    }
    return userItem;
  }
}

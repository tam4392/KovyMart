import { JwtPayload } from './../dto/jwt_payload.interface';
import { AuthCredentialDto } from './../dto/auth_credential.dto';
import { errorsKey } from './../../../config/errors_key';
import { User } from './../entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(createUserDto.password, salt);
    user.password = hashPass;

    try {
      const result = await this.usersRepository.save(user);
      delete result.password;
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(errorsKey.users.email_exists);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<any> {
    const { email, password } = authCredentialDto;
    const user = await this.usersRepository.findOne({ email });
    const isCompare: boolean = await bcrypt.compare(password, user.password);
    if (user && isCompare) {
      delete user.password;
      const payload: JwtPayload = { user };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException(errorsKey.users.auth_credential_wrong);
    }
  }
}

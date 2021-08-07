import { CustomerModule } from './../customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerJwtStrategy } from './strategies/customer.jwt_strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configJwt } from './../../config/jwt';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(configJwt),
    CustomerModule,
  ],
  providers: [AuthService, CustomerJwtStrategy], 
  controllers: [AuthController],
  exports: [CustomerJwtStrategy, PassportModule],
})
export class AuthModule {}

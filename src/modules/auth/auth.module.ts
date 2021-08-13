import { CustomerModule } from './../customer/customer.module';
import { StaffModule } from './../staff/staff.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerJwtStrategy } from './strategies/customer.jwt_strategy';
import { StaffJwtStrategy } from './strategies/staff.jwt_strategy';
import { Module } from '@nestjs/common';
import { AuthController,AuthStaffController } from './controllers/auth.controller';
import { AuthService,AuthStaffService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configJwt } from './../../config/jwt';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(configJwt),
    CustomerModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(configJwt),
    StaffModule,
  ],
  providers: [AuthService, CustomerJwtStrategy,AuthStaffService,StaffJwtStrategy], 
  controllers: [AuthController,AuthStaffController],
  exports: [CustomerJwtStrategy,StaffJwtStrategy, PassportModule],
})
export class AuthModule {}

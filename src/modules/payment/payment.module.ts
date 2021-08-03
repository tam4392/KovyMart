import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [],
  controllers: [],
  exports: [],
})
export class PaymentModule {}

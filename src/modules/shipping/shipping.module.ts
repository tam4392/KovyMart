import { Shipping } from './entities/shipping.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping])],
  providers: [],
  controllers: [],
  exports: [],
})
export class ShippingModule {}

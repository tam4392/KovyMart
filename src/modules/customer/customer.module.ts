import { CustomerAddress } from './entities/customer_address.entity';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerAddress])],
  providers: [],
  controllers: [],
  exports: [],
})
export class CustomerModule {}

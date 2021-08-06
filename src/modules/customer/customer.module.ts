import { CustomerService } from './service/customer.service';
import { CustomerAddress } from './entities/customer_address.entity';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerAddress])],
  providers: [CustomerService],
  controllers: [],
  exports: [CustomerService],
})
export class CustomerModule {}

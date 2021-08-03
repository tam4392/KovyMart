import { OrderDetail } from './entities/order_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  providers: [],
  controllers: [],
  exports: [],
})
export class OrderModule {}

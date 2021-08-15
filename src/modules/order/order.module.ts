import { OrderDetailService } from './service/order_detail.service';
import { OrderService } from './service/order.service';
import { ProductModule } from './../product/product.module';
import { PaymentModule } from './../payment/payment.module';
import { OrderController } from './controller/order.controller';
import { OrderDetail } from './entities/order_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    PaymentModule,
    ProductModule,
  ],
  providers: [OrderService, OrderDetailService],
  controllers: [OrderController],
  exports: [],
})
export class OrderModule {}

import { Order } from './../entities/order.entity';
import { OrderDetailDto } from './../dto/create_order.dto';
import { OrderDetail } from './../entities/order_detail.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async create(orderDetailDto: OrderDetailDto, order: Order): Promise<OrderDetail> {
    const item = new OrderDetail();
    item.quantity = orderDetailDto.quantity;
    item.price = orderDetailDto.price;
    item.total = orderDetailDto.total;
    item.order = order;
    item.productId = orderDetailDto.productId;

    try {
      const result = await this.orderDetailRepository.save(item);
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

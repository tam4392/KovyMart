import { OrderDetailService } from './order_detail.service';
import { ProductService } from './../../product/service/product.service';
import { PaymentService } from './../../payment/service/payment.service';
import { Customer } from './../../customer/entities/customer.entity';
import { CreateOrderDto, OrderDetailDto } from './../dto/create_order.dto';
import { Order } from './../entities/order.entity';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly paymentService: PaymentService,
    private readonly productService: ProductService,
    private readonly orderDetailService: OrderDetailService,
  ) {}

  private async checkProductExist(items: OrderDetailDto[]): Promise<boolean> {
    let isExistProduct = true;
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const productItem = await this.productService.findOne(element.productId);
      if (!productItem) {
        isExistProduct = false;
        break;
      }
    }
    return isExistProduct;
  }

  private async createOrderItems(
    items: OrderDetailDto[],
    order: Order,
  ): Promise<boolean> {
    let isSuccess = true;
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const orderDetail = await this.orderDetailService.create(element, order);
      if (!orderDetail) {
        isSuccess = false;
        break;
      }
    }
    return isSuccess;
  }

  async create(
    createOrderDto: CreateOrderDto,
    customer: Customer,
  ): Promise<Order> {
    const order = new Order();
    order.customer = customer;
    order.totalPrice = createOrderDto.totalPrice;
    order.note = createOrderDto.note || '';
    const paymentItem = await this.paymentService.findOne(
      createOrderDto.paymentId,
    );
    if (!paymentItem) {
      throw new BadRequestException('Payment method not exist');
    }
    order.payment = paymentItem;
    const isExistProduct = await this.checkProductExist(createOrderDto.items);
    if (!isExistProduct) {
      throw new BadRequestException('Product not exist');
    }

    try {
      const result = await this.orderRepository.save(order);
      const resultItem = await this.createOrderItems(
        createOrderDto.items,
        result,
      );
      if (!resultItem) {
        throw new InternalServerErrorException();
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

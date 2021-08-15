import { OrderService } from './../service/order.service';
import { Customer } from './../../customer/entities/customer.entity';
import { CreateOrderDto } from './../dto/create_order.dto';
import { JwtCustomerAuthGuard } from './../../auth/guards/customer.jwt_auth.guard';
import { PaginatedResultDto } from './../../helper/dto/paginated_result.dto';
import { PaginationDto } from './../../helper/dto/pagination.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { GetCustomer } from './../../customer/service/get_customer.decorator';

@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtCustomerAuthGuard)
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @GetCustomer() customer: Customer,
  ): Promise<any> {
    return this.orderService.create(createOrderDto, customer);
  }

  //   @Get()
  //   findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
  //     paginationDto.page = Number(paginationDto.page);
  //     paginationDto.limit = Number(paginationDto.limit);

  //     return this.orderService.findAll({
  //       ...paginationDto,
  //       limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
  //     });
  //   }
}

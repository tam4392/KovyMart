import { PaymentService } from './../service/payment.service';
import { PaymentDto } from './../dto/payment.dto';
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

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() paymentDto: PaymentDto): Promise<any> {
    return this.paymentService.create(paymentDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.paymentService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }
}

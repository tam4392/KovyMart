import { Product } from './../entities/product.entity';
import { ProductDto } from './../dto/product.dto';
import { JwtCustomerAuthGuard } from '../../auth/guards/customer.jwt_auth.guard';
import { ProductService } from './../service/product.service';
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
  Res,
  Query,
  Patch
} from '@nestjs/common';
import { Response } from 'express';
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.productService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(@Body() productDto: ProductDto): Promise<Product> {
    return this.productService.create(productDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createDto: ProductDto,
    @Res() res: Response,
  ): Promise<Product> {
    return this.productService.update(Number(id), createDto, res);
  }
  @Delete(':id')
  delete(@Param('id')id:string): Promise<void> {
    return this.productService.remove(Number(id));
  }
}

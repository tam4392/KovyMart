import { SupplierService } from './../service/supplier.service';
import { SupplierDto } from './../dto/supplier.dto';
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
} from '@nestjs/common';

@Controller('api/supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() supplierDto: SupplierDto): Promise<any> {
    return this.supplierService.create(supplierDto);
  }
}

import { Province } from './../entities/province.entity';
import { CreateProvincesDto } from './../dto/create.dto';
import { ProvinceService } from './../service/provinces.service';
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

@Controller('api/provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvinceService) {}

  @Post()
  create(@Body() createDto: CreateProvincesDto): Promise<Province> {
    return this.provincesService.create(createDto);
  }

}

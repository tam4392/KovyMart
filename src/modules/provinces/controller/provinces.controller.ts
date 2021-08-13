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
  Res,
  Query,
  Patch
} from '@nestjs/common';
import { Response } from 'express';
@Controller('api/provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvinceService) {}

  @Post()
  create(@Body() createDto: CreateProvincesDto): Promise<Province> {
    return this.provincesService.create(createDto);
  }
  @Get(':id')
  findOne(@Param('id')id:string): Promise<Province> {
    return this.provincesService.findOne(Number(id));
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createDto: CreateProvincesDto,
    @Res() res: Response,
  ): Promise<Province> {
    return this.provincesService.update(Number(id), createDto, res);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.provincesService.remove(Number(id));
  }
  @Get('/')
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    return this.provincesService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

}

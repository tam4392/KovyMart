import { District } from './../entities/district.entity';
import { CreateDistrictDto } from './../dto/create.dto';
import { DistrictService } from './../service/district.service';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { PaginationDto } from '../../helper/dto/pagination.dto';
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
} from '@nestjs/common';
import { Response } from 'express';
@Controller('api/districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}
  @Get('/')
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    return this.districtService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<District> {
    return this.districtService.findOne(Number(id));
  }
  @Post()
  create(@Body() createDto: CreateDistrictDto, @Res() res: Response) {
    return this.districtService.create(createDto, res);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createDto: CreateDistrictDto,
    @Res() res: Response,
  ): Promise<District> {
    return this.districtService.update(Number(id), createDto, res);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.districtService.remove(Number(id));
  }
}

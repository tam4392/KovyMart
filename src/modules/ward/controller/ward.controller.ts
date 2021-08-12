import { Ward } from './../entities/ward.entity';
import { CreateWardsDto } from './../dto/create.dto';
import { WardService } from './../service/ward.service';
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
  Res,
  UseGuards,
  Req,
  Query,
  Patch
} from '@nestjs/common';
import { Response } from 'express';
@Controller('api/wards')
export class WardsController {
  constructor(private readonly wardService: WardService) {}

  @Post()
  create(@Body() createDto: CreateWardsDto, @Res() res: Response) {
    return this.wardService.create(createDto, res);
  }
  @Get(':id')
  findOne(@Param('id')id:string): Promise<Ward> {
    return this.wardService.findOne(Number(id));
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createDto: CreateWardsDto,
    @Res() res: Response,
  ): Promise<Ward> {
    return this.wardService.update(Number(id), createDto, res);
  }
  @Delete(':id')
  delete(@Param('id')id:string): Promise<void> {
    return this.wardService.remove(Number(id));
  }
  @Get('/')
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    return this.wardService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }
}

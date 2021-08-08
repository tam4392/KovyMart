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
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';

@Controller('api/wards')
export class WardsController {
  constructor(private readonly wardService: WardService) {}

  @Post()
  create(@Body() createDto: CreateWardsDto): Promise<Ward> {
    return this.wardService.create(createDto);
  }
  @Get(':id')
  findOne(@Param('id')id:string): Promise<Ward> {
    return this.wardService.findOne(Number(id));
  }
  @Put(':id')
  update(@Param('id')id:string , createDto: CreateWardsDto): Promise<Ward> {
    return this.wardService.update(Number(id),createDto);
  }
  @Delete(':id')
  delete(@Param('id')id:string): Promise<void> {
    return this.wardService.remove(Number(id));
  }
  @Get('/')
  findAll(): Promise<Ward> {
    return this.wardService.findAll();
  }

}

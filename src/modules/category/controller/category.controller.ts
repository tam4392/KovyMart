import { JwtCustomerAuthGuard } from '../../auth/guards/customer.jwt_auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PaginationDto } from '../../helper/dto/pagination.dto';
import { CategoryService } from './../service/category.service';
import { CategoryDto } from '../dto/category.dto';
import { Category } from './../entities/category.entity';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.categoryService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(Number(id));
  }

  @Post()
  create(@Body() createDto: CategoryDto): Promise<Category> {
    return this.categoryService.create(createDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() CategoryDto: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(Number(id), CategoryDto);
  }
}

import { CategoryDto } from './../dto/category.dto';
import { Category } from './../entities/category.entity';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    if (!paginationDto.page) {
      paginationDto.page = 1;
    }
    if (!paginationDto.limit) {
      paginationDto.limit = 20;
    }
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.categoryRepository.count();
    const lstCategory = await this.categoryRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: lstCategory,
    };
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async create(categoryDto: CategoryDto): Promise<Category> {
    const category = new Category();
    category.name = categoryDto.name;
    category.description = categoryDto.description;

    try {
      const result = await this.categoryRepository.save(category);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, categoryDto: CategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    category.name = categoryDto.name;
    category.description = categoryDto.description;

    try {
      const result = await this.categoryRepository.save(category);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}

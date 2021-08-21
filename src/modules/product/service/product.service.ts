import { ProductDto } from './../dto/product.dto';
import { Product } from './../entities/product.entity';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { CategoryService } from 'src/modules/category/service/category.service';
import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    const { search, category } = paginationDto;
    if (!paginationDto.page) {
      paginationDto.page = 1;
    }
    if (!paginationDto.limit) {
      paginationDto.limit = 20;
    }
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.productRepository.count();

    const query = this.productRepository.createQueryBuilder('product');
    if (category) {
      query.where('product.category = :category', { category });
    }

    if (search) {
      query.andWhere('LOWER(product.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const result = await query
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    const products = result.map((item: Product) => {
      const newItem = { ...item };
      newItem['productName'] = item.name;
      delete newItem.name;
      return newItem;
    });

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: products,
    };
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async create(productDto: ProductDto): Promise<Product> {
    const product = new Product();
    product.name = productDto.name;
    product.sku = productDto.sku;
    product.description = productDto.description || '';
    product.price = productDto.price;
    product.unit = productDto.unit || '';
    product.discount = productDto.discount || 0;
    product.categoryId = productDto.categoryId ;
    product.supplierId = productDto.supplierId ;

    try {
      const result = await this.productRepository.save(product);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async update(
    id: number,
    createDto: ProductDto,
    @Res() res: Response,
  ): Promise<any> {
    const product = await this.productRepository.findOne(id);
    if (product) {
      product.name = createDto.name;
      product.sku = createDto.sku;
      product.description = createDto.description;
      product.price = createDto.price;
      product.unit = createDto.unit;
      product.discount = createDto.discount;
      product.categoryId = createDto.categoryId;
      const pv = await this.categoryService.findOne(product.categoryId);
      if (pv) {
        try {
          const result = await this.productRepository.save(product);
          console.log(result);
          return res.json(result);
        } catch (error) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: 'update not successfull' });
        }
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Category not found' });
      }
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Not found' });
    }
  }
  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
 }
}

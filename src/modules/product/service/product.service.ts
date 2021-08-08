import { ProductDto } from './../dto/product.dto';
import { Product } from './../entities/product.entity';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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
    product.categoryId = productDto.categoryId;
    product.supplierId = productDto.supplierId;

    try {
      const result = await this.productRepository.save(product);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

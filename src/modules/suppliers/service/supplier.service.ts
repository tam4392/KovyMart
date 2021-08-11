import { SupplierDto } from '../dto/supplier.dto';
import { Supplier } from '../entities/supplier.entity';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    if (!paginationDto.page) {
      paginationDto.page = 1;
    }
    if (!paginationDto.limit) {
      paginationDto.limit = 20;
    }
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.supplierRepository.count();
    const lstSupplier = await this.supplierRepository
      .createQueryBuilder()
      .orderBy('id', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: lstSupplier,
    };
  }

  async findOne(id: number): Promise<Supplier> {
    return this.supplierRepository.findOne(id);
  }

  async create(supplierDto: SupplierDto): Promise<Supplier> {
    const supplier = new Supplier();
    supplier.name = supplierDto.name;
    supplier.email = supplierDto.email;
    supplier.phone = supplierDto.phone;
    supplier.address = supplierDto.address;
    // supplier.province = supplierDto.provinceId;
    // supplier.address = supplierDto.district;
    // supplier.address = supplierDto.ward;

    try {
      const result = await this.supplierRepository.save(supplier);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, supplierDto: SupplierDto): Promise<Supplier> {
    const supplier = await this.findOne(id);
    supplier.name = supplierDto.name;
    supplier.email = supplierDto.email;
    supplier.phone = supplierDto.phone;
    supplier.address = supplierDto.address;

    try {
      const result = await this.supplierRepository.save(supplier);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.supplierRepository.delete(id);
  }
}

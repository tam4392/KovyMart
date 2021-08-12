import { CreateProvincesDto } from './../dto/create.dto';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    if (!paginationDto.page) {
      paginationDto.page = 1;
    }
    if (!paginationDto.limit) {
      paginationDto.limit = 20;
    }
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.provinceRepository.count();
    const lstCategory = await this.provinceRepository
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

  async findOne(id: number): Promise<Province> {
    return this.provinceRepository.findOne(id);
  }

  async create(createDto: CreateProvincesDto): Promise<Province> {
    const province = new Province();
    province.name = createDto.name;
    try {
      const result = await this.provinceRepository.save(province);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async update(
    id: number,
    createDto: CreateProvincesDto,
    @Res() res: Response,
  ): Promise<any> {
    const province = await this.provinceRepository.findOne(id);
    if (province) {
      province.name = createDto.name;
      const result = await this.provinceRepository.save(province);
      console.log(result);
          return res.json(result);
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'provinceId not found' });
    }
  }
    async remove(id: number): Promise<void> {
    await this.provinceRepository.delete(id);
  }
}

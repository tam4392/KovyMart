import { CreateDistrictDto } from './../dto/create.dto';
import { District } from 'src/modules/district/entities/district.entity';
import { ProvinceService } from 'src/modules/provinces/service/provinces.service';
import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { PaginationDto } from '../../helper/dto/pagination.dto';
@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    private provinceService: ProvinceService,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    if (!paginationDto.page) {
      paginationDto.page = 1;
    }
    if (!paginationDto.limit) {
      paginationDto.limit = 20;
    }
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.districtRepository.count();
    const lstCategory = await this.districtRepository
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
  async findOne(id: number): Promise<District> {
    return this.districtRepository.findOne(id);
  }

  async create(createDto: CreateDistrictDto, @Res() res: Response) {
    const district = new District();
    district.name = createDto.name;
    district.provinceId = createDto.provinceId;
    district.createdAt = new Date();
    const pv = await this.provinceService.findOne(district.provinceId);
    if (pv) {
      try {
        console.log('1');
        const result = await this.districtRepository.save(district);
        console.log(result);
        return res.status(HttpStatus.CREATED).json(result);
      } catch (error) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'insert not successfull' });
      }
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'provinceId not found' });
    }
  }
  async update(
    id: number,
    createDto: CreateDistrictDto,
    @Res() res: Response,
  ): Promise<any> {
    const district = await this.districtRepository.findOne(id);
    if (district) {
      district.name = createDto.name;
      district.provinceId = createDto.provinceId;
      const pv = await this.provinceService.findOne(district.provinceId);
      if (pv) {
        try {
          const result = await this.districtRepository.save(district);
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
          .json({ message: 'provinceId not found' });
      }
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'districtId not found' });
    }
  }
  async remove(id: number): Promise<void> {
    await this.districtRepository.delete(id);
  }
}

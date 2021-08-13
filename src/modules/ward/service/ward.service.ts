import { CreateWardsDto } from './../dto/create.dto';
import { Ward } from 'src/modules/ward/entities/ward.entity';
import { DistrictService } from 'src/modules/district/service/district.service';
import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@Injectable()
export class WardService {
  constructor(
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
    private districtService: DistrictService,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    if (!paginationDto.page) {
      paginationDto.page = 1;
    }
    if (!paginationDto.limit) {
      paginationDto.limit = 20;
    }
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.wardRepository.count();
    const lstCategory = await this.wardRepository
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

  async findOne(id: number): Promise<Ward> {
    return this.wardRepository.findOne(id);
  }

  async create(createDto: CreateWardsDto, @Res() res: Response) {
    const ward = new Ward();
    ward.name = createDto.name;
    ward.districtId = createDto.districtId;
    ward.createdAt = new Date();
    const pv = await this.districtService.findOne(ward.districtId);
    if (pv) {
      try {
        console.log('1');
        const result = await this.wardRepository.save(ward);
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
        .json({ message: 'districtId not found' });
    }
  }
  async update(
    id: number,
    createDto: CreateWardsDto,
    @Res() res: Response,
  ): Promise<any> {
    const ward = await this.wardRepository.findOne(id);
    if (ward) {
      ward.name = createDto.name;
      ward.districtId = createDto.districtId;
      const pv = await this.districtService.findOne(ward.districtId);
      if (pv) {
        try {
          const result = await this.wardRepository.save(ward);
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
          .json({ message: 'districtId not found' });
      }
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'wardId not found' });
    }
  }

    async remove(id: number): Promise<void> {
       await this.wardRepository.delete(id);
    }
}

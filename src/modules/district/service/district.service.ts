import { CreateDistrictDto } from './../dto/create.dto';
import { District } from 'src/modules/district/entities/district.entity';
import { ProvinceService } from 'src/modules/provinces/service/provinces.service';
import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    private provinceService: ProvinceService,
  ) {}

  async findAll(): Promise<any[]> {
    return this.districtRepository.find();
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

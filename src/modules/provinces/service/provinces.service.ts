import { CreateProvincesDto } from './../dto/create.dto';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}

  async findAll(): Promise<any> {
    return this.provinceRepository.find();
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

  async update(id: number, createDto: CreateProvincesDto): Promise<any> {
      const province = await this.findOne(id);
      province.name = createDto.name;
      try {
        const result = await this.provinceRepository.save(province);
        return result;
      } catch (error) {
        console.log(error);
      }
  }

    async remove(id: number): Promise<void> {
       await this.provinceRepository.delete(id);
    }
}

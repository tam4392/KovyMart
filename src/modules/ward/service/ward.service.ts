import { CreateWardsDto } from './../dto/create.dto';
import { Ward } from 'src/modules/ward/entities/ward.entity';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@Injectable()
export class WardService {
  constructor(
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async findAll(): Promise<any> {
    return this.wardRepository.find();
  }

  async findOne(id: number): Promise<Ward> {
    return this.wardRepository.findOne(id);
  }

  async create(createDto: CreateWardsDto): Promise<Ward> {
    const ward = new Ward();
    ward.name = createDto.name;
    try {
      const result = await this.wardRepository.save(ward);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, createDto: CreateWardsDto): Promise<any> {
      const province = await this.findOne(id);
      province.name = createDto.name;
      try {
        const result = await this.wardRepository.save(province);
        return result;
      } catch (error) {
        console.log(error);
      }
  }

    async remove(id: number): Promise<void> {
       await this.wardRepository.delete(id);
    }
}

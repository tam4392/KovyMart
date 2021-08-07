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

  //   async findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto> {

  //   }

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

  //   async update(id: number, createActorDto: CreateActorDto): Promise<Province> {
  //     const actor = await this.findOne(id);
  //     actor.first_name = createActorDto.first_name;
  //     actor.last_name = createActorDto.last_name;

  //     try {
  //       const result = await this.actorRepository.save(actor);
  //       return result;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async remove(id: number): Promise<void> {
  //     // await this.actorRepository.delete(actor_id);
  //   }
}

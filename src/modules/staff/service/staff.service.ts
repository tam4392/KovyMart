import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { CreateStaffDto } from '../../auth/dto/create_staff.dto';
  import { Staff } from '../entities/staff.entity';
  import { errorsKey } from '../../../config/errors_key';
  
  @Injectable()
  export class StaffService {
    constructor(
      @InjectRepository(Staff)
      public readonly staffRepository: Repository<Staff>,
    ) {}
  
    async create(createStaffDto: CreateStaffDto): Promise<Staff> {
      const staff = new Staff();
      staff.email = createStaffDto.email;
      staff.password = createStaffDto.password;
  
      try {
        const result = await this.staffRepository.save(staff);
        delete result.password;
        return result;
      } catch (error) {
        if (error.code === '23505') {
          throw new ConflictException(errorsKey.users.email_exists);
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
  
    async findByEmail(email: string): Promise<Staff> {
      return this.staffRepository.findOne({ email });
    }
  }
  
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from '../../auth/dto/create_customer.dto';
import { Customer } from './../entities/customer.entity';
import { errorsKey } from './../../../config/errors_key';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer();
    customer.email = createCustomerDto.email;
    customer.password = createCustomerDto.password;

    try {
      const result = await this.customerRepository.save(customer);
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

  async findByEmail(email: string): Promise<Customer> {
    return this.customerRepository.findOne({ email });
  }
}

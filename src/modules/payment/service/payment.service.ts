import { PaymentDto } from './../dto/payment.dto';
import { Payment } from './../entities/payment.entity';
import { PaginatedResultDto } from '../../helper/dto/paginated_result.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto> {
    if (!paginationDto.page) {
      paginationDto.page = 1;
    }
    if (!paginationDto.limit) {
      paginationDto.limit = 20;
    }
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.paymentRepository.count();
    const lstPayment = await this.paymentRepository
      .createQueryBuilder()
      .orderBy('id', 'ASC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: lstPayment,
    };
  }

  async findOne(id: number): Promise<Payment> {
    return this.paymentRepository.findOne(id);
  }

  async create(paymentDto: PaymentDto): Promise<Payment> {
    const payment = new Payment();
    payment.name = paymentDto.name;
    payment.type = paymentDto.type;

    try {
      const result = await this.paymentRepository.save(payment);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, paymentDto: PaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.name = paymentDto.name;
    payment.type = paymentDto.type;

    try {
      const result = await this.paymentRepository.save(payment);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}

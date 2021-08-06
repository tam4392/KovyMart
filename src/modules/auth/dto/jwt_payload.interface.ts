import { Customer } from './../../customer/entities/customer.entity';

export interface JwtPayload {
  customer: Customer;
}

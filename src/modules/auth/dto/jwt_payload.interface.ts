import { Customer } from './../../customer/entities/customer.entity';
import { Staff } from './../../staff/entities/staff.entity';
export interface JwtPayload {
  customer: Customer;
}
export interface JwtStaffPayload {
  staff: Staff;
}
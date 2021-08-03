import { Ward } from './../../ward/entities/ward.entity';
import { District } from './../../district/entities/district.entity';
import { Province } from './../../provinces/entities/province.entity';
import { Customer } from './customer.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class CustomerAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  address: string;

  @Column()
  phone: string;

  @ManyToOne(() => Customer, (customer) => customer.customerAddress)
  customer: Customer;

  @OneToOne(() => Province, (province) => province.customerAddress)
  @JoinColumn()
  province: Province;

  @OneToOne(() => District, (district) => district.customerAddress)
  @JoinColumn()
  district: District;

  @OneToOne(() => Ward, (ward) => ward.customerAddress)
  @JoinColumn()
  ward: Ward;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

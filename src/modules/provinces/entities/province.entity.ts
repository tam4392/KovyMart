import { Supplier } from './../../suppliers/entities/supplier.entity';
import { CustomerAddress } from './../../customer/entities/customer_address.entity';
import { District } from '../../district/entities/district.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => District, (district) => district.province, {
    eager: false,
  })
  districts: District[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToOne(
    () => CustomerAddress,
    (customerAddress) => customerAddress.province,
  )
  customerAddress: CustomerAddress;

  @OneToOne(() => Supplier, (supplier) => supplier.province)
  supplier: Supplier;
}

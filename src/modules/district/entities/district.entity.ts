import { CustomerAddress } from './../../customer/entities/customer_address.entity';
import { Ward } from './../../ward/entities/ward.entity';
import { Province } from '../../provinces/entities/province.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Province, (provinces) => provinces.districts, {
    eager: false,
  })
  province: Province;

  @OneToMany(() => Ward, (ward) => ward.district, {
    eager: false,
  })
  wards: Ward[];

  @OneToOne(
    () => CustomerAddress,
    (customerAddress) => customerAddress.district,
  )
  customerAddress: CustomerAddress;

  @OneToOne(() => Supplier, (supplier) => supplier.district)
  supplier: Supplier;
}

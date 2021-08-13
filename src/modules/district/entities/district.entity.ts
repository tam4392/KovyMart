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
  JoinColumn,
  BeforeInsert
} from 'typeorm';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  provinceId: number;

  @ManyToOne(() => Province, (provinces) => provinces.districts)
  @JoinColumn({ name: 'provinceId' })
  province: Province;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

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
  @BeforeInsert()
  beforeInsert() {
    this.updatedAt = new Date();
  }
}

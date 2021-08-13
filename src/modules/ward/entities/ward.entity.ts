
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import { CustomerAddress } from './../../customer/entities/customer_address.entity';
import { District } from './../../district/entities/district.entity';
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
@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  districtId: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => District, (district) => district.wards)
  @JoinColumn({ name: 'districtId' })
  district: District;

  @OneToOne(() => CustomerAddress, (customerAddress) => customerAddress.ward)
  customerAddress: CustomerAddress;

  @OneToOne(() => Supplier, (supplier) => supplier.ward)
  supplier: Supplier;
  @BeforeInsert()
  beforeInsert() {
    this.updatedAt = new Date();
  }

}

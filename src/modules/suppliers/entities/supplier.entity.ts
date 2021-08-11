import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { District } from 'src/modules/district/entities/district.entity';
import { Ward } from 'src/modules/ward/entities/ward.entity';
import { Product } from './../../product/entities/product.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({nullable: true})
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => Province, (province) => province.supplier)
  @JoinColumn()
  province: Province;

  @OneToOne(() => District, (district) => district.supplier)
  @JoinColumn()
  district: District;

  @OneToOne(() => Ward, (ward) => ward.supplier)
  @JoinColumn()
  ward: Ward;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.supplier)
  product: Product[];

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

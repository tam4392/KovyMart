import { Product } from './../../product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @OneToOne(() => Product, (product) => product.inventory)
  @JoinColumn()
  product: Product;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

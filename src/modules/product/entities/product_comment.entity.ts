import { Customer } from './../../customer/entities/customer.entity';
import { Product } from './product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProductComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => Product, (product) => product.comments)
  product: Product;

  @ManyToOne(() => Customer, (customer) => customer.comments)
  customer: Customer;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

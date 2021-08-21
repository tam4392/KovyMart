import { Product } from './../../product/entities/product.entity';
import { Order } from './order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  total: number;

  @ManyToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.orderDetail)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

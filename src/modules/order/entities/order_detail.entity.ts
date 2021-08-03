import { Product } from './../../product/entities/product.entity';
import { Order } from './order.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Product, (product) => product.orderDetail)
  product: Product;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

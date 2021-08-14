import { Order } from './../../order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

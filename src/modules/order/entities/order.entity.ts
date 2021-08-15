import { OrderDetail } from './order_detail.entity';
import { Shipping } from './../../shipping/entities/shipping.entity';
import { Payment } from './../../payment/entities/payment.entity';
import { Customer } from './../../customer/entities/customer.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum OrderStatus {
  WAIT_CONFIRM = 1,
  CONFIRMED,
  PACKING,
  SHIPPING,
  COMPLETE,
  CANCEL,
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  status: number;

  @Column({ type: 'float' })
  totalPrice: number;

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: false })
  @Exclude({ toPlainOnly: true })
  customer: Customer;

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn()
  payment: Payment;

  @OneToOne(() => Shipping, (shipping) => shipping.order)
  shipping: Shipping;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail[];

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = OrderStatus.WAIT_CONFIRM;
  }
}

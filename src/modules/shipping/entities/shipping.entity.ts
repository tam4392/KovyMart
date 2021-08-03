import { Staff } from './../../staff/entities/staff.entity';
import { Order } from './../../order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  status: number;

  @ManyToOne(() => Staff, (staff) => staff.shipping)
  staff: Staff;

  @OneToOne(() => Order, (order) => order.shipping)
  @JoinColumn()
  order: Order;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

import { ProductComment } from './../../product/entities/product_comment.entity';
import { Order } from './../../order/entities/order.entity';
import { CustomerAddress } from './customer_address.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'boolean', nullable: true })
  gender: boolean;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.customer,
  )
  customerAddress: CustomerAddress[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => ProductComment, (productComment) => productComment.customer)
  comments: ProductComment[];

  @BeforeInsert()
  async checkBeforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
  }
}

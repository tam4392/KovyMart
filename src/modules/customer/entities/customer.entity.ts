import { ProductComment } from './../../product/entities/product_comment.entity';
import { Order } from './../../order/entities/order.entity';
import { CustomerAddress } from './customer_address.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  phone: string;

  @Column({ type: 'boolean' })
  gender: boolean;

  @Column()
  birthday: Date;

  @Column()
  createdAt: Date;

  @Column()
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
}

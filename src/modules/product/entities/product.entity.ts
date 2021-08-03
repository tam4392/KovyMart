import { ProductComment } from './product_comment.entity';
import { ProductImage } from './product_image.entity';
import { OrderDetail } from './../../order/entities/order_detail.entity';
import { Inventory } from './../../inventory/entities/inventory.entity';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import { Category } from './../../category/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  unit: string;

  @Column({ type: 'float' })
  discount: number;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @ManyToOne(() => Supplier, (supplier) => supplier.product)
  supplier: Supplier;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  inventory: Inventory;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetail[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @OneToMany(() => ProductComment, (productComment) => productComment.product)
  comments: ProductComment[];

  //   @OneToOne(() => Payment, (payment) => payment.order)
  //   @JoinColumn()
  //   payment: Payment;
}

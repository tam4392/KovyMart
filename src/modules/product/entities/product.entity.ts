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
  BeforeInsert,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'float', nullable: true })
  discount: number;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  supplierId: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.product)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  inventory: Inventory;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetail[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @OneToMany(() => ProductComment, (productComment) => productComment.product)
  comments: ProductComment[];

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

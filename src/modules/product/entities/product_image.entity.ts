import { Product } from './product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

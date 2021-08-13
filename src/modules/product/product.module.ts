import { ProductComment } from './entities/product_comment.entity';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductImage } from './entities/product_image.entity';
import {CategoryModule} from './../category/category.module';
@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, ProductComment]), CategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}

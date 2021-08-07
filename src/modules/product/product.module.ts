import { AuthModule } from './../auth/auth.module';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductImage } from './entities/product_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage]), AuthModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class ProductModule {}

import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [],
  controllers: [],
  exports: [],
})
export class SuppliersModule {}

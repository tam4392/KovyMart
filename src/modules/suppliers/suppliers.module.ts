import { SupplierController } from './controller/suppliers.controller';
import { SupplierService } from './service/supplier.service';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [SupplierService],
  controllers: [SupplierController],
  exports: [],
})
export class SuppliersModule {}

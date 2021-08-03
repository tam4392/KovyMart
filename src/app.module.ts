import { ProductModule } from './modules/product/product.module';
import { RoleModule } from './modules/role/role.module';
import { StaffModule } from './modules/staff/staff.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/order/order.module';
import { CustomerModule } from './modules/customer/customer.module';
import { WardModule } from './modules/ward/ward.module';
import { ProvinceModule } from './modules/provinces/province.module';
import { configValidationSchema } from './config/schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configOrm } from './config/orm';
import { AuthModule } from './modules/auth/auth.module';
import { DistrictModule } from './modules/district/district.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { CategoryModule } from './modules/category/category.module';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.NODE_ENV}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync(configOrm),
    // AuthModule,
    ProvinceModule,
    DistrictModule,
    WardModule,
    CustomerModule,
    OrderModule,
    PaymentModule,
    ShippingModule,
    StaffModule,
    RoleModule,

    SuppliersModule,
    CategoryModule,
    ProductModule,
    InventoryModule
  ],
})
export class AppModule {}

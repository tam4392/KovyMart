import { ProvincesController } from './controller/provinces.controller';
import { ProvinceService } from './service/provinces.service';
import { Province } from './entities/province.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  providers: [ProvinceService],
  controllers: [ProvincesController],
  exports: [],
})
export class ProvinceModule {}

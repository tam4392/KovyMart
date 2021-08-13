import { DistrictController } from './controller/district.controller';
import { DistrictService } from './service/district.service';
import { District } from './entities/district.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {ProvinceModule} from './../provinces/province.module'

@Module({
  imports: [TypeOrmModule.forFeature([District]), ProvinceModule],
  providers: [DistrictService],
  controllers: [DistrictController],
  exports: [],
})
export class DistrictModule {}

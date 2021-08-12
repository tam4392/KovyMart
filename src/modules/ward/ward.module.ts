import { WardsController } from './controller/ward.controller';
import { WardService } from './service/ward.service';
import { Ward } from './entities/ward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {DistrictModule} from './../district/district.module'
@Module({
  imports: [TypeOrmModule.forFeature([Ward]), DistrictModule],
  providers: [WardService],
  controllers: [WardsController],
  exports: [WardService],
})
export class WardModule {}

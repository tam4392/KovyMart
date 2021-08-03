import { Province } from './entities/province.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  providers: [],
  controllers: [],
  exports: [],
})
export class ProvinceModule {}

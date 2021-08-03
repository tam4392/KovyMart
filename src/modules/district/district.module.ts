import { District } from './entities/district.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  providers: [],
  controllers: [],
  exports: [],
})
export class DistrictModule {}

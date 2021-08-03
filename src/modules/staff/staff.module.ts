import { Staff } from './entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  providers: [],
  controllers: [],
  exports: [],
})
export class StaffModule {}

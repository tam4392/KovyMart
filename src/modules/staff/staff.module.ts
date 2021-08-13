import { Staff } from './entities/staff.entity';
import { StaffService } from './service/staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  providers: [StaffService],
  controllers: [],
  exports: [StaffService],
})
export class StaffModule {}

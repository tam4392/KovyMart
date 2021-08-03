import { Ward } from './entities/ward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Ward])],
  providers: [],
  controllers: [],
  exports: [],
})
export class WardModule {}

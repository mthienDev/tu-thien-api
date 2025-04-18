import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charity } from './charity.entity';
import { CharityService } from './charity.service';
import { CharityController } from './charity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Charity])],
  providers: [CharityService],
  controllers: [CharityController],
})
export class CharityModule {}

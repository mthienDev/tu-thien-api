import { DonationController } from '@/modules/donation/controller/donation.controller';
import { Donation } from '@/modules/donation/donation.entity';
import { DonationService } from '@/modules/donation/service/donation.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Donation])],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService],
})
export class DonationModule {}

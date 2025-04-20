import { CreateDonationDto } from '@/modules/donation/dto/create-donation.dto';
import { SearchDonationsDto } from '@/modules/donation/dto/search-donations.dto';
import { UpdateDonationDto } from '@/modules/donation/dto/update-donation.dto';
import { DonationService } from '@/modules/donation/service/donation.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('donations')
@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách donations' })
  search(@Query() searchDto: SearchDonationsDto) {
    return this.donationService.searchDonations(searchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin donation theo id' })
  findOne(@Param('id') id: string) {
    return this.donationService.findone(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới donation' })
  create(@Body() donation: CreateDonationDto) {
    return this.donationService.create(donation);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật donation theo id' })
  update(@Param('id') id: string, @Body() donation: UpdateDonationDto) {
    return this.donationService.update(id, donation);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa donation theo id' })
  remove(@Param('id') id: string) {
    return this.donationService.remove(id);
  }
}

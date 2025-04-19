import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Charity } from '@/modules/charity/charity.entity';
import { CharityService } from '@/modules/charity/charity.service';
import { CreateCharityDto } from '@/modules/charity/dto/create-charity.dto';
import { UpdateCharityDto } from '@/modules/charity/dto/update-charity.dto';

@ApiTags('charities') // Thêm tag cho controller
@Controller('charity')
export class CharityController {
  constructor(private readonly charityService: CharityService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả chương trình' })
  findAll(): Promise<Charity[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.charityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Cập nhật chương trình' })
  findOne(id: string): Promise<Charity> {
    return this.charityService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo chương trình mới' })
  create(@Body() data: CreateCharityDto): Promise<Charity> {
    return this.charityService.create(data);
  }

  @Put(':id')
  update(
    @Body() data: UpdateCharityDto,
    @Param('id') id: string,
  ): Promise<Charity> {
    return this.charityService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa chương trình' })
  remove(id: string): Promise<void> {
    return this.charityService.remove(id);
  }
}

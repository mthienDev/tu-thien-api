/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCharityDto {
  @ApiProperty({ example: 'Chương trình quyên góp cho trẻ em m' })
  @IsString()
  @IsNotEmpty({
    message: 'Tên chương trình không được để trống',
  })
  name: string;

  @ApiProperty({ example: 'Hỗ trợ lũ lụt miền Trung tháng 10' })
  @IsString()
  @IsNotEmpty({
    message: 'Mô tả chương trình không được để trống',
  })
  description: string;

  @ApiProperty({ example: 100000000 })
  @IsNotEmpty({
    message: 'Số tiền quyên góp không được để trống',
  })
  goalAmount: number;
}

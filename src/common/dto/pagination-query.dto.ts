import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

/**
 * DTO cho pagination: page & limit.
 * - page: trang hiện tại (bắt đầu từ 1)
 * - limit: số phần tử trên mỗi trang
 */
export class PaginationQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Số trang, bắt đầu từ 1' })
  @IsOptional()
  @Type(() => Number) // Chuyển đổi sang kiểu Number
  @IsInt({ message: ' page phải là số nguyên' })
  @Min(1, { message: ' page phải lớn hơn hoặc bằng 1' })
  page?: number = 1; // default = 1

  @ApiPropertyOptional({ example: 10, description: 'Số phần tử mỗi trang' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit phải là số nguyên' })
  @Min(1, { message: 'limit tối thiểu là 1' })
  limit?: number = 10; // default = 10
}

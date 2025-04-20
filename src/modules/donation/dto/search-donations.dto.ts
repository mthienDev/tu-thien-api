import { Type } from 'class-transformer';
import { IsOptional, IsUUID, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

/**
 * DTO để search & paginate donations.
 * Kế thừa page & limit từ PaginationQueryDto,
 * và thêm các filter riêng cho Donation.
 */
export class SearchDonationsDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'uuid-user', description: 'Lọc theo userId' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    example: 'uuid-charity',
    description: 'Lọc theo charityId',
  })
  @IsOptional()
  @IsUUID()
  charityId?: string;

  @ApiPropertyOptional({ example: 1000, description: 'Số tiền tối thiểu' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minAmount?: number;

  @ApiPropertyOptional({ example: 1000000, description: 'Số tiền tối đa' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxAmount?: number;
}

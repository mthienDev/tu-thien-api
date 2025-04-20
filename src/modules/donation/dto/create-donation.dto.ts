import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDonationDto {
  @ApiProperty({ example: 'UUID của user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'UUID của charity' })
  @IsUUID()
  charityId: string;

  @ApiProperty({ example: 1000000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'VNPay', required: false })
  @IsString()
  @IsOptional()
  paymentMethod: string;

  @ApiProperty({ example: 'txn-123', required: false })
  @IsString()
  @IsOptional()
  transactionId: string;
}

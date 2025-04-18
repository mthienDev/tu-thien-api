import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupAuthDto {
  @ApiProperty({ example: 'mail@examle.com' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự',
  })
  password: string;
}

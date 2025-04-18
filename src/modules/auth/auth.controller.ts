import { SignupAuthDto } from '@/auth/dto/signup-auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginAuthDto } from '@/auth/dto/login-auth.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inject AuthService để sử dụng các phương thức của nó
  @Post('signup')
  @ApiOperation({ summary: 'Tạo tài khoản mới' })
  signup(@Body() dto: SignupAuthDto) {
    return this.authService.signup(dto.email, dto.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  login(@Body() body: LoginAuthDto) {
    return this.authService.login(body.email, body.password);
  }
}

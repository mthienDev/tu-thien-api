import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/jwt.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return { message: 'This is your profile' };
  }
}

import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/user/user.service';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, // Inject UserService để sử dụng các phương thức của nó
    private jwtService: JwtService, // Inject JwtService để tạo token
  ) {}

  async signup(email: string, password: string) {
    const existed = await this.userService.findByEmail(email);
    if (existed) {
      throw new ConflictException('Email đã được đăng ký');
    }
    const hashed = await bcrypt.hash(password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.userService.create({
      email,
      password: hashed,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai mật khẩu');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

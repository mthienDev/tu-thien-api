import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Xin chào từ nền tảng Từ Tâm!';
  }
}

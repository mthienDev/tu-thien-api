import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Add your User entity here
  providers: [UserService],
  exports: [UserService], // Export UserService if you want to use it in other modules
})
export class UserModule {}

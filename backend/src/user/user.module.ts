import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repository/user.repository';
import { HashingModule } from 'src/hashing/hashing.module';

@Module({
  imports:[HashingModule],
  controllers: [UserController],
  providers: [UserService,UserRepository],
})
export class UserModule {}

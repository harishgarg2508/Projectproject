import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repository/user.repository';
import { HashingModule } from 'src/hashing/hashing.module';
import { FeedbacksModule } from 'src/feedbacks/feedbacks.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports:[HashingModule,FeedbacksModule,CommentsModule],
  controllers: [UserController],
  providers: [UserService,UserRepository],
})
export class UserModule {}

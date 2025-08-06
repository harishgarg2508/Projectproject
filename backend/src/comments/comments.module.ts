import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentRepository } from 'src/repository/comments.repository';
import { FeedbackRepository } from 'src/repository/feedbacks.repository';
import { UserRepository } from 'src/repository/user.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository,FeedbackRepository,UserRepository],
  exports: [CommentsService]
})
export class CommentsModule {}

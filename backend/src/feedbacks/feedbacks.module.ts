import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbackRepository } from 'src/repository/feedbacks.repository';
import { TagsModule } from 'src/tags/tags.module';
import { TagRepository } from 'src/repository/tags.repository';
import { FeedbackTagRepository } from 'src/repository/feedback-tags.repository';
import { UserRepository } from 'src/repository/user.repository';

@Module({
  imports: [TagsModule],
  controllers: [FeedbacksController],
  providers: [FeedbacksService,FeedbackRepository,TagRepository,FeedbackTagRepository,UserRepository],
  exports:[FeedbacksService]
})
export class FeedbacksModule {}

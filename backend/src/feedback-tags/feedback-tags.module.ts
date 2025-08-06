import { Module } from '@nestjs/common';
import { FeedbackTagsService } from './feedback-tags.service';
import { FeedbackTagsController } from './feedback-tags.controller';

@Module({
  controllers: [FeedbackTagsController],
  providers: [FeedbackTagsService],
})
export class FeedbackTagsModule {}

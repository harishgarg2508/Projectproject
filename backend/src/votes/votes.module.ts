import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { FeedbackRepository } from 'src/repository/feedbacks.repository';
import { UserRepository } from 'src/repository/user.repository';
import { VoteRepository } from 'src/repository/votes.repository';

@Module({
  controllers: [VotesController],
  providers: [VotesService, FeedbackRepository, UserRepository,VoteRepository],
})
export class VotesModule { }

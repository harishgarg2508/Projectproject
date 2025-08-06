import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { FeedbackRepository } from 'src/repository/feedbacks.repository';
import { UserRepository } from 'src/repository/user.repository';
import { Role } from 'src/user/entities/user.entity';
import { VoteRepository } from 'src/repository/votes.repository';
import { VoteType } from './entities/vote.entity';

@Injectable()
export class VotesService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly userRepository: UserRepository,
    private readonly voteRepository: VoteRepository
  ) { }
  async createVote(createVoteDto: CreateVoteDto, userId: number) {

    const { feedback_id, voteType } = createVoteDto

    const feedbackEntity = await this.feedbackRepository.findOne({ where: { id: feedback_id } });
    if (!feedbackEntity) {
      throw new NotFoundException('Feedback not found');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    });

    if (user && user.role === Role.ADMIN) {
      throw new ForbiddenException('Admins are not allowed to create Vote');
    }
    
    const existingVote = await this.voteRepository.findOne({
      where: {
        feedback: {
          id: feedback_id,
        },
        user: {
          id: userId,
        },
  
      },
    });



    
    
    if (!existingVote) {
      const vote = await this.voteRepository.createVote(feedbackEntity.id, voteType, userId);
      await this.calculateScore(feedbackEntity.id);
      const score = await this.calculateScore(feedbackEntity.id);
      await this.feedbackRepository.update(feedbackEntity.id, { score });
     return vote
    }
    else{
     await this.voteRepository.remove(existingVote);

    }

     if(existingVote?.voteType !== voteType){
        await this.voteRepository.createVote(feedbackEntity.id, voteType, userId);(existingVote);
        await this.calculateScore(feedbackEntity.id);
      const score = await this.calculateScore(feedbackEntity.id);
      await this.feedbackRepository.update(feedbackEntity.id, { score });
      }
      
     
    


   
  }

  async calculateScore(feedback_id: number) {
    const votes = await this.voteRepository.find({
      where: {
        feedback: {
          id: feedback_id,
        },
      },
    });
    let score = 0;
    for (const vote of votes) {
      if (vote.voteType === VoteType.UPVOTE) {
        score++;
      } else if (vote.voteType === VoteType.DOWNVOTE) {
        score--;
      }
    }
    return score;
  }

  findAll() {
    return `This action returns all votes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}

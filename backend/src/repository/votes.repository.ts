import { Injectable } from '@nestjs/common';
import { Vote, VoteType } from 'src/votes/entities/vote.entity';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class VoteRepository extends Repository<Vote> {
  constructor(private readonly dataSource: DataSource) {
    super(Vote, dataSource.createEntityManager());
  }
  
  async createVote(feedback_id: number,voteType: VoteType,userId: number) {
    const vote = this.create({
      feedback:{id:feedback_id},
      voteType,
      user:{id:userId}
    });
    await this.save(vote);
    return vote;
  }
}
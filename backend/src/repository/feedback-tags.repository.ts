import { Injectable } from '@nestjs/common';
import { FeedbackTag } from 'src/feedback-tags/entities/feedback-tag.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class FeedbackTagRepository extends Repository<FeedbackTag> {
  constructor(private readonly dataSource: DataSource) {
    super(FeedbackTag, dataSource.createEntityManager());
  }
  
 
}
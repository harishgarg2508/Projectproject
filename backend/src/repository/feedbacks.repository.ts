import { Injectable } from '@nestjs/common';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/constants';
import { FeedbackFilterDto, OrderBy } from 'src/feedbacks/dto/feedback-filter.dto';
import { Feedback, Status } from 'src/feedbacks/entities/feedback.entity';
import { DataSource, Repository } from 'typeorm';

const LIMIT = DEFAULT_LIMIT
const PAGE = DEFAULT_PAGE
@Injectable()
export class FeedbackRepository extends Repository<Feedback> {
  constructor(private readonly dataSource: DataSource) {
    super(Feedback, dataSource.createEntityManager());
  }

  async createfeedback(title: string, description: string, status: Status, userId: number) {
    const feedback = this.create({ title, description, status, user: { id: userId } });
    await this.save(feedback);
    return feedback;
  }

  async findAllFeedbacks(filters: FeedbackFilterDto) {
    const { search, limit = LIMIT, page = PAGE, status=Status.PUBLIC, orderBy, tagIds, tagId ,authorIds} = filters;
    const query = this.createQueryBuilder('feedback')
      .where('feedback.is_visible = :is_visible', { is_visible: true })
      .leftJoinAndSelect('feedback.tags', 'tags')
      .leftJoinAndSelect('tags.tag', 'tag')
      .leftJoinAndSelect('feedback.user', 'user')
      .leftJoinAndSelect('feedback.votes', 'votes')
      .leftJoinAndSelect('feedback.comments', 'comments','comments.parent IS null');

    if (search) {
      query.andWhere('(feedback.title LIKE :search OR feedback.description LIKE :search)', { search: `%${search}%` });
    }
    if (tagId) {
      query.andWhere('tags.id = :tagId', { tagId });
    }
    if (tagIds && tagIds.length > 0) {
      query.andWhere('tags.id IN (:...tagIds)', { tagIds });
    }
    if(authorIds && authorIds.length > 0) {
      query.andWhere('user.id IN (:...authorIds)', { authorIds });
    }
    if (orderBy) {
      query.orderBy('feedback.score', orderBy);
    }
    if (limit) {
      query.take(limit);
    }
    if (page) {
      query.skip((page - 1) * limit);
    }
    if (status) {
      query.andWhere('feedback.status = :status', { status });
    }
    const totalCount = await query.getCount();
    const feedbacks = await query.getMany();
    return { feedbacks, totalCount };
  }
}


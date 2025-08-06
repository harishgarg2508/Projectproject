import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbackRepository } from 'src/repository/feedbacks.repository';
import { TagsService } from 'src/tags/tags.service';
import { TagRepository } from 'src/repository/tags.repository';
import { In } from 'typeorm';
import { FeedbackTagRepository } from 'src/repository/feedback-tags.repository';
import { FeedbackFilterDto } from './dto/feedback-filter.dto';
import { UserRepository } from 'src/repository/user.repository';
import { Role } from 'src/user/entities/user.entity';

@Injectable()
export class FeedbacksService {
  constructor(private readonly feedbackRepository: FeedbackRepository,
    private readonly tagsService: TagsService,
    private readonly tagsRepository: TagRepository,
    private readonly feedbackTagsRepository: FeedbackTagRepository,
    private readonly userRepository: UserRepository
  ) { }

  async createFeedback(createFeedbackDto: CreateFeedbackDto,userId: number) {

    const { title, description, status, tagNames } = createFeedbackDto;

    
    await this.tagsService.upsertTags(tagNames);



    const feedbackEntity = await this.feedbackRepository.createfeedback(
      title,
      description,
      status,
      userId
    );



    const tags = await this.tagsRepository.find({ where: { name: In(tagNames) } });
    const feedbackTags = tags.map((tag) => ({
      feedback: { id: feedbackEntity.id },
      tag: { id: tag.id }
    }));


    const savedFeedbackTags = await this.feedbackTagsRepository.upsert(feedbackTags, ['feedback', 'tag']);

    return feedbackEntity
  }

  findAllFeedbacks(filters:FeedbackFilterDto) {
    return this.feedbackRepository.findAllFeedbacks(filters);
  }

  async updatefeedback(id:number, userId: number) {

  const user = await this.userRepository.findOne({ where: { id: userId } });
   if(user?.role !== Role.ADMIN) {
      throw new NotFoundException('You do not have permission to update feedback');
    }
    const feedback = await this.feedbackRepository.findOne({ where: { id } });
    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }
    feedback.is_visible = !feedback.is_visible;
    await this.feedbackRepository.save(feedback);
    return feedback;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}

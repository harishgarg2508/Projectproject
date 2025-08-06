import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from 'src/repository/comments.repository';
import { FeedbackRepository } from 'src/repository/feedbacks.repository';
import { UserRepository } from 'src/repository/user.repository';
import { Role } from 'src/user/entities/user.entity';

@Injectable()
export class CommentsService {

  constructor(private readonly commentsRepository: CommentRepository,
    private readonly feedbacksRepository: FeedbackRepository,
    private readonly userRepository: UserRepository
  ) {}



  async createComment(createCommentDto: CreateCommentDto,user_id:number) {
    const{content,feedback_id,parent_id}=createCommentDto

    const parent = this.commentsRepository.findOneBy({ id: parent_id });

    if (!parent) {
      throw new NotFoundException('Parent comment not found');
    }

    const feedback = this.feedbacksRepository.findOneBy({ id: feedback_id });

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      }
    });

    if (user && user.role === Role.ADMIN) {
      throw new ForbiddenException('Admins are not allowed to create comments');
    }


    return this.commentsRepository.createComment(createCommentDto,user_id);

  }

  async updateComment(id: number, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user?.role !== Role.ADMIN) {
      throw new NotFoundException('You do not have permission to update comment');
    }

    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    comment.is_visible = !comment.is_visible;
    
    await this.commentsRepository.save(comment);
    return comment;
  }


  findAll() {
    return this.commentsRepository.getComments();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { Comment } from 'src/comments/entities/comment.entity';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private readonly dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async createComment(createCommentDto: CreateCommentDto,user_id:number) {
    const comment = this.create({
      content: createCommentDto.content,
      feedback: {id:createCommentDto.feedback_id},
      user: {id:user_id},
      parent: {id:createCommentDto.parent_id}
    });
    await this.save(comment);
    return comment
  }
  

  async getComments() {
    const qb = this.createQueryBuilder('comment');
    qb.where('comment.is_visible = :is_visible', { is_visible: true });
    qb.leftJoinAndSelect('comment.parent', 'parent')
    .leftJoinAndSelect('parent.parent', 'grandparent')
    .leftJoinAndSelect('comment.children', 'child')
    .leftJoinAndSelect('parent.children', 'children');
    qb.leftJoinAndSelect('comment.user', 'user');
    return qb.getMany();
  }
}
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { Comment } from 'src/comments/entities/comment.entity';
import { DataSource, FindTreeOptions, Repository,TreeRepository } from 'typeorm';


@Injectable()
export class CommentRepository extends TreeRepository<Comment> {
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
  




  async getComments(feedbackId: number, options?: FindTreeOptions): Promise<Comment[]> {
    const roots = await this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.feedback', 'feedback')
      .where('feedback.id = :feedbackId', { feedbackId })
      .andWhere('comment.parent IS NULL')
      .andWhere('comment.is_visible = :is_visible', { is_visible: true })
      .getMany();

    await Promise.all(
      roots.map(root => this.findDescendantsTree(root, options))
    );

    return roots;
  }

// async getComments(feedbackId: number) {
//   const qb = this.createQueryBuilder('comment')
//     .where('comment.is_visible = :is_visible', { is_visible: true })
//     .andWhere('comment.feedbackId = :feedbackId', { feedbackId }) 
//     .andWhere('comment.parent IS NULL') 
//     .leftJoinAndSelect('comment.parent', 'parent')
//     .leftJoinAndSelect('parent.parent', 'grandparent')
//     .leftJoinAndSelect('comment.children', 'child')
//     .leftJoinAndSelect('child.children', 'grandchild')
//     .leftJoinAndSelect('grandchild.children', 'greatgrandchild')
//     .leftJoinAndSelect('parent.children', 'children')
//     .leftJoinAndSelect('comment.user', 'user')
//     .orderBy('comment.created_at', 'ASC')
//     .addOrderBy('child.created_at', 'ASC')
//     .addOrderBy('grandparent.created_at', 'ASC');

//   return qb.getMany();
// }


}
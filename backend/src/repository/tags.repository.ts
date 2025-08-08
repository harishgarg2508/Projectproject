import { Injectable } from '@nestjs/common';
import { CreateTagDto } from 'src/tags/dto/create-tag.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class TagRepository extends Repository<Tag> {
  constructor(private readonly dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async createTag(createTagDto: CreateTagDto) {
    const tag = this.create(createTagDto);
    await this.save(tag);
    return tag;
  }

  async findAll(search: string) {
    const qb = this.createQueryBuilder('tag')
    const count = await qb.getCount();

    if(search) {
      qb.where('tag.name LIKE :search', { search: `%${search}%` });
    }
    qb.take(10);
    qb.orderBy('tag.created_at', 'DESC');
    return qb.getMany();
  }
}
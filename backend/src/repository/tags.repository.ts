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
}
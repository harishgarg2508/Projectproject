import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from 'src/repository/tags.repository';

@Injectable()
export class TagsService {

  constructor(private readonly tagsRepository: TagRepository) {}
  create(createTagDto: CreateTagDto) {

    return 'This action adds a new tag';
  }

  async createTag(createTagDto: CreateTagDto) {
    return this.tagsRepository.createTag(createTagDto);
  }

  async upsertTags(tagNames: string[]) {

    const tagsToInsert = tagNames?.map((name) => ({ name }));

    const tags = await this.tagsRepository.upsert(tagsToInsert, ['name']);

    return tags?.raw ?? [];
  }

  findAll() {
    return `This action returns all tags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}

import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagRepository } from 'src/repository/tags.repository';

@Module({
  controllers: [TagsController],
  providers: [TagsService,TagRepository],
  exports: [TagsService],
})
export class TagsModule {}

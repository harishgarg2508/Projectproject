import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackTagsService } from './feedback-tags.service';
import { CreateFeedbackTagDto } from './dto/create-feedback-tag.dto';
import { UpdateFeedbackTagDto } from './dto/update-feedback-tag.dto';

@Controller('feedback-tags')
export class FeedbackTagsController {
  constructor(private readonly feedbackTagsService: FeedbackTagsService) {}

  @Post()
  create(@Body() createFeedbackTagDto: CreateFeedbackTagDto) {
    return this.feedbackTagsService.create(createFeedbackTagDto);
  }

  @Get()
  findAll() {
    return this.feedbackTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackTagDto: UpdateFeedbackTagDto) {
    return this.feedbackTagsService.update(+id, updateFeedbackTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackTagsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { AuthGuard } from 'src/gaurds/auth.gaurd';
import { Request } from 'express';
import { FeedbackFilterDto } from './dto/feedback-filter.dto';



interface RequestWithUser extends Request {
  user: { id: string };
}

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @UseGuards(AuthGuard)
  @Post()
  createFeedback(@Body() createFeedbackDto: CreateFeedbackDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.feedbacksService.createFeedback(createFeedbackDto, +userId);
  }

  @Get()
findAllFeedbacks(@Query() filters: FeedbackFilterDto) {
  console.log('Filters:', filters);
  return this.feedbacksService.findAllFeedbacks(filters);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbacksService.update(+id, updateFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(+id);
  }
}

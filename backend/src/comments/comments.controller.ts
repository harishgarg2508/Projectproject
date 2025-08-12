import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/gaurds/auth.gaurd';


interface RequestWithUser extends Request {
  user: { id: string };
}


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto,@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.commentsService.createComment(createCommentDto,+userId);
  }

  @Get()
  findAll(@Query('feedback_Id') feedback_Id: string   ) {
    return this.commentsService.findAll(+feedback_Id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}

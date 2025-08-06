import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FeedbacksService } from 'src/feedbacks/feedbacks.service';
import { AuthGuard } from 'src/gaurds/auth.gaurd';
import { CommentsService } from 'src/comments/comments.service';


interface RequestWithUser extends Request {
  user: { id: string };
}
@UseGuards(AuthGuard)

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly feedbacksService: FeedbacksService,
    private readonly commentsService: CommentsService
  ) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser();
  }

  @Get(":id")
  getUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

 

  @Patch(':id')
  makeInactive(@Param('id') id: number) {
    return this.userService.makeInactive(id);
  }

  @Patch('feedback/:feedbackId/status')
  updatefeedback(@Param('feedbackId') feedbackId: number, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.feedbacksService.updatefeedback(feedbackId,+userId);

  }
  @Patch('comment/:commentId/status')
  updateComment(@Param('commentId') commentId: string, @Req() req: RequestWithUser) {
        const userId = req.user.id;

    return this.commentsService.updateComment(+commentId,+userId);
  }
}
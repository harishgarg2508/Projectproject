import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { AuthGuard } from 'src/gaurds/auth.gaurd';


interface RequestWithUser extends Request {
  user: { id: string };
}

@UseGuards(AuthGuard)
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) { }

  @Post()
  createVote(@Body() createVoteDto: CreateVoteDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.votesService.createVote(createVoteDto, +userId);
  }

  @Get()
  findAll() {
    return this.votesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.votesService.update(+id, updateVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votesService.remove(+id);
  }
}

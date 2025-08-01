import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SmallService } from './small.service';
import { CreateSmallDto } from './dto/create-small.dto';
import { UpdateSmallDto } from './dto/update-small.dto';

@Controller('small')
export class SmallController {
  constructor(private readonly smallService: SmallService) {}

  @Post()
  create(@Body() createSmallDto: CreateSmallDto) {
    return this.smallService.create(createSmallDto);
  }

  @Get()
  findAll() {
    return this.smallService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smallService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmallDto: UpdateSmallDto) {
    return this.smallService.update(+id, updateSmallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smallService.remove(+id);
  }
}

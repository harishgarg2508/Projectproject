import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LargeService } from './large.service';
import { CreateLargeDto } from './dto/create-large.dto';
import { UpdateLargeDto } from './dto/update-large.dto';

@Controller('large')
export class LargeController {
  constructor(private readonly largeService: LargeService) {}

  @Post()
  create(@Body() createLargeDto: CreateLargeDto) {
    return this.largeService.create(createLargeDto);
  }

  @Get()
  findAll() {
    return this.largeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.largeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLargeDto: UpdateLargeDto) {
    return this.largeService.update(+id, updateLargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.largeService.remove(+id);
  }
}

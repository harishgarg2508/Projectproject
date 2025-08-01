import { Injectable } from '@nestjs/common';
import { CreateLargeDto } from './dto/create-large.dto';
import { UpdateLargeDto } from './dto/update-large.dto';

@Injectable()
export class LargeService {
  create(createLargeDto: CreateLargeDto) {
    return 'This action adds a new large';
  }

  findAll() {
    return `This action returns all large`;
  }

  findOne(id: number) {
    return `This action returns a #${id} large`;
  }

  update(id: number, updateLargeDto: UpdateLargeDto) {
    return `This action updates a #${id} large`;
  }

  remove(id: number) {
    return `This action removes a #${id} large`;
  }
}

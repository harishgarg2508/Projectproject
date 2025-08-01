import { Injectable } from '@nestjs/common';
import { CreateSmallDto } from './dto/create-small.dto';
import { UpdateSmallDto } from './dto/update-small.dto';

@Injectable()
export class SmallService {
  create(createSmallDto: CreateSmallDto) {
    return 'This action adds a new small';
  }

  findAll() {
    return `This action returns all small`;
  }

  findOne(id: number) {
    return `This action returns a #${id} small`;
  }

  update(id: number, updateSmallDto: UpdateSmallDto) {
    return `This action updates a #${id} small`;
  }

  remove(id: number) {
    return `This action removes a #${id} small`;
  }
}

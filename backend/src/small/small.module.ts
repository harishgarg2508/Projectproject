import { Module } from '@nestjs/common';
import { SmallService } from './small.service';
import { SmallController } from './small.controller';

@Module({
  controllers: [SmallController],
  providers: [SmallService],
})
export class SmallModule {}

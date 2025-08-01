import { Module } from '@nestjs/common';
import { LargeService } from './large.service';
import { LargeController } from './large.controller';

@Module({
  controllers: [LargeController],
  providers: [LargeService],
})
export class LargeModule {}

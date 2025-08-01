import { Test, TestingModule } from '@nestjs/testing';
import { LargeController } from './large.controller';
import { LargeService } from './large.service';

describe('LargeController', () => {
  let controller: LargeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LargeController],
      providers: [LargeService],
    }).compile();

    controller = module.get<LargeController>(LargeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

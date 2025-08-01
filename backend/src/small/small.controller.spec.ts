import { Test, TestingModule } from '@nestjs/testing';
import { SmallController } from './small.controller';
import { SmallService } from './small.service';

describe('SmallController', () => {
  let controller: SmallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmallController],
      providers: [SmallService],
    }).compile();

    controller = module.get<SmallController>(SmallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

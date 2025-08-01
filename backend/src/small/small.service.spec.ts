import { Test, TestingModule } from '@nestjs/testing';
import { SmallService } from './small.service';

describe('SmallService', () => {
  let service: SmallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmallService],
    }).compile();

    service = module.get<SmallService>(SmallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

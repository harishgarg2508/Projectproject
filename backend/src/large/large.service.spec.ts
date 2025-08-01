import { Test, TestingModule } from '@nestjs/testing';
import { LargeService } from './large.service';

describe('LargeService', () => {
  let service: LargeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LargeService],
    }).compile();

    service = module.get<LargeService>(LargeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AfformService } from './afform.service';

describe('AfformService', () => {
  let service: AfformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfformService],
    }).compile();

    service = module.get<AfformService>(AfformService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

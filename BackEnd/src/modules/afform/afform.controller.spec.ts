import { Test, TestingModule } from '@nestjs/testing';
import { AfformController } from './afform.controller';
import { AfformService } from './afform.service';

describe('AfformController', () => {
  let controller: AfformController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfformController],
      providers: [AfformService],
    }).compile();

    controller = module.get<AfformController>(AfformController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

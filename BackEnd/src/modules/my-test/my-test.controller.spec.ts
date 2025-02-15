import { Test, TestingModule } from '@nestjs/testing';
import { MyTestController } from './my-test.controller';
import { MyTestService } from './my-test.service';

describe('MyTestController', () => {
  let controller: MyTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyTestController],
      providers: [MyTestService],
    }).compile();

    controller = module.get<MyTestController>(MyTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

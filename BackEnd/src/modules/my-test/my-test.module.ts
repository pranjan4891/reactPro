import { Module } from '@nestjs/common';
import { MyTestService } from './my-test.service';
import { MyTestController } from './my-test.controller';

@Module({
  controllers: [MyTestController],
  providers: [MyTestService],
})
export class MyTestModule {}

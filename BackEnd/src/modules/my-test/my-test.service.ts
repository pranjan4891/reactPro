import { Injectable } from '@nestjs/common';
import { CreateMyTestDto } from './dto/create-my-test.dto';
import { UpdateMyTestDto } from './dto/update-my-test.dto';

@Injectable()
export class MyTestService {
  create(createMyTestDto: CreateMyTestDto) {
    return 'This action adds a new myTest';
  }

  findAll() {
    return `This action returns all myTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myTest`;
  }

  update(id: number, updateMyTestDto: UpdateMyTestDto) {
    return `This action updates a #${id} myTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} myTest`;
  }
}

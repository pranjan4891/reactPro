import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MyTestService } from './my-test.service';
import { CreateMyTestDto } from './dto/create-my-test.dto';
import { UpdateMyTestDto } from './dto/update-my-test.dto';

@Controller('my-test')
export class MyTestController {
  constructor(private readonly myTestService: MyTestService) {}

  @Post()
  create(@Body() createMyTestDto: CreateMyTestDto) {
    const x = this.myTestService.create(createMyTestDto)
    console.log(x)
    return {data:x};
  }

  @Get()
  findAll() {
    return this.myTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyTestDto: UpdateMyTestDto) {
    return this.myTestService.update(+id, updateMyTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myTestService.remove(+id);
  }
}

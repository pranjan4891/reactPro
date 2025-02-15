import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException,HttpStatus } from '@nestjs/common';
import { AfformService } from './afform.service';
import { CreateAfformDto } from './dto/create-afform.dto';
import { UpdateAfformDto } from './dto/update-afform.dto';

@Controller('afform')
export class AfformController {
  constructor(private readonly afformService: AfformService) {}

  @Post()
    async create(@Body() createAfformtDto: CreateAfformDto) {
      try {
        const afform = await this.afformService.create(createAfformtDto);
        return { message: 'Afform submitted  successfully', data: afform };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  // create(@Body() createAfformDto: CreateAfformDto) {
  //   return this.afformService.create(createAfformDto);
  // }

  @Get()
  findAll() {
    return this.afformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.afformService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAfformDto: UpdateAfformDto) {
    return this.afformService.update(+id, updateAfformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.afformService.remove(+id);
  }
}

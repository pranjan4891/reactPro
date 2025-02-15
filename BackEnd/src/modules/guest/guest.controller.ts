import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import mongoose from 'mongoose';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post()
  async create(@Body() createGuestDto: CreateGuestDto) {
    try {
      const result = await this.guestService.create(createGuestDto);
      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    try {
      const result = await this.guestService.findAll({page, limit, search});
      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException({
          msg: 'Validation error: Invalid User Id Passed',
          remarks: 'VALIDATION_FAILED',
          errors: {
            userId: ['Invalid User Id Passed.'],
          },
        });
      }
      const guest = await this.guestService.findOne(id);
      if (!guest) {
        
          throw new NotFoundException(
            {            
              errorCode: 'NO_RECORD_FOUND',
              remarks: 'NO_RECORD_FOUND',
              exceptions: null,
              errors: null,
              msg: `No Record found`,
              data: []          
            }          
          );
      }
      return { message: 'Guest retrieved successfully', data: guest };
    } catch (error) {
      if(error instanceof NotFoundException || error instanceof BadRequestException){
        throw error;
      }
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGuestDto: UpdateGuestDto) {
    try {
      const updatedGuest = await this.guestService.update(id, updateGuestDto);
      if (!updatedGuest) {
        throw new HttpException('Guest not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Guest updated successfully', data: updatedGuest };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedGuest = await this.guestService.remove(id);
      if (!deletedGuest) {
        throw new HttpException('Guest not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Guest removed successfully', data: deletedGuest };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  async create(@Body() createVenueDto: CreateVenueDto) {
    console.log('createVenueDtofromController=====>',createVenueDto);

    return this.venueService.createVenue(createVenueDto);
  }



  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    console.log(id);
    
    return this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(+id);
  }
}

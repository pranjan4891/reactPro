import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Venue,VenueSchema } from 'src/schemas/venue.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }])
  ],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}

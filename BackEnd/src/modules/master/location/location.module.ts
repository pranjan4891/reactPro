import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationSchema, Location } from "../../../schemas/location.schema";
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}

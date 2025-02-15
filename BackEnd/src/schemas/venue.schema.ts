import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from './status.enum';

@Schema({ timestamps: true })
export class Venue extends Document {
  @Prop({ required: true })
  venueName: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: String,
    enum: Status,
    default: Status.INACTIVE,
  })
  status: Status
}

// Create schema factory
export const VenueSchema = SchemaFactory.createForClass(Venue);

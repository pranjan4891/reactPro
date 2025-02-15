import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from './status.enum';

@Schema({ timestamps: true })  // Automatically add createdAt and updatedAt fields
export class Location extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({
    type: String,
    enum: Status,
    default: Status.INACTIVE,
  })
  status: Status
}

// Generate the Mongoose schema
export const LocationSchema = SchemaFactory.createForClass(Location);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GuestDocument = Guest & Document;

@Schema({
  collection: 'timesharing_guests',
  timestamps: true,
})
export class Guest {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  middleName: string; // Made optional

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  add:string;

  @Prop({ required: true })
  location: string;

  @Prop()
  date: string; // Optional by default

  @Prop({ required: true })
  venue: string;

  @Prop()
  manager: string; // Optional by default

  @Prop()
  consultant: string; // Optional by default

  @Prop({ default: false })
  afFormGenerated: boolean;

  @Prop({ default: false, required: false })
  isVoucherSent: boolean; // Newly added boolean field
}

export const GuestSchema = SchemaFactory.createForClass(Guest);

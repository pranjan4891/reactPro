import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Status } from './status.enum';

export type PlanDocument = Plan & Document;

@Schema(
  {
    collection:'timesharing_plan',
    timestamps: true
  }
)  // Automatically add createdAt and updatedAt fields
export class Plan extends Document {
  @Prop({ required: true })
  name: string;

  // @Prop({ required: true })
  // type: string;

  @Prop({ required: true })
  tenure: string;

  @Prop({ required: true })
  nightsAvailable: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  basePrice: string;

  @Prop({ required: true })
  minimumPrice: string;

  @Prop({ required: true })
  amcCharges: string;

  @Prop({ required: true })
  noOfDaysForIntiationBeforeBooking: string;

  @Prop()
  planDescription: string;

  @Prop()
  bookingSpecialComment: string;

  @Prop()
  isActive: string;

  // @Prop({ required: true })
  // ammount: number;
}

// Generate the Mongoose schema
export const PlanSchema = SchemaFactory.createForClass(Plan);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  log_for: string;

  @Prop({ index: true })
  user_id: string;

  @Prop({ required: true })
  file: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({
    enum: ['application_level', 'user_level'],
    default: 'application_level',
  })
  log_level: string;

  @Prop({ enum: ['warning', 'error', 'info'], default: 'info' })
  log_type: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);

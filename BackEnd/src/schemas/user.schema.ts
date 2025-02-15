import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.enum'; // Enum for roles
import { Status } from './status.enum';

export type UserDocument = User & Document;

@Schema({
  timestamps: true, // Automatically handle createdAt and updatedAt
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  mobile: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, select: false })
  password_visible: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ type: String, enum: Status, default: Status.ACTIVE })
  status: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from "./status.enum";
import { Role } from './role.enum';
import { IsOptional } from 'class-validator';
import { Department } from './department.enum';

export type PickupRequestDocument = Employee & Document;

@Schema(
  {
    collection:'timesharing_employees',
    timestamps: true
  }
)
export class Employee {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop()
  alternatePhoneNumber?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  confirmPassword: string;

  @Prop({ required: true })
  permanentAddress: string;

  @Prop()
  alternateAddress?: string;

  @Prop({
    type: String,
    enum: Department,
    required: true,
    default:Department.HR
  })
  department: Department;

  @Prop({
    type: String,
    enum: Role,
    required: true,
    default:Role.USER
  })
  role: Role;

  @Prop({ required: true })
  location: string;

  @Prop()
  reportingTo: string;
  
  @Prop({ required: true })
  venue: string;

  @Prop()
  employeeImage?: string; // File path or URL for Employee Image

  @Prop()
  kycImage?: string; // File path or URL for KYC Image

  @Prop({
    type: String,
    enum: Status,
    default: Status.INACTIVE,
  })
  isActive: string;
}

// Ab hum schema factory create karenge
export const EmployeeSchema = SchemaFactory.createForClass(Employee);


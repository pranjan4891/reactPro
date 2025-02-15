import { IsString, IsEmail, IsNotEmpty, IsOptional, IsBoolean, IsEnum, IsPhoneNumber, Matches, Max, isBoolean ,isEnum, IsMobilePhone} from 'class-validator';
import { Type } from 'class-transformer';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Department } from 'src/schemas/department.enum';
import { Role } from 'src/schemas/role.enum';
import { Status } from 'src/schemas/status.enum';
export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    userName: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @IsMobilePhone()
    phoneNumber: string;
    
    @IsOptional()
    @IsString()
    @IsMobilePhone()
    alternatePhoneNumber?: string;
  
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/, {message: 'Password must be 8+ characters with at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.'})
    password: string;
  
    @IsString()
    @IsNotEmpty()
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/, {message: 'Password must be 8+ characters with at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.'})
    confirmPassword: string;
  
    @IsNotEmpty()
    @IsString()
    // @Max(350)
    permanentAddress: string;
  
    @IsOptional()
    @IsString()
    // @Max(150)
    alternateAddress?: string;
  
    @IsNotEmpty()
    @IsEnum(Department)
    department: Department;
  
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
  
    @IsNotEmpty()
    @IsString()
    reportingTo: string;
    
    @IsNotEmpty()
    @IsString()
    location: string;
  
    @IsNotEmpty()
    @IsString()
    venue: string;

    @Prop({ type: Types.ObjectId, ref: 'Venue', required: true })
    venueId: Types.ObjectId;
  
    @IsOptional()
    @IsString()
    employeeImage?: string; // Yeh image ko file upload ki tarah treat karenge.
  
    @IsOptional()
    @IsString()
    kycImage?: string; // KYC image bhi file upload ki tarah treat hogi.
  
    @IsEnum(Status)
    // @IsNotEmpty()
    isActive?: Status;
}





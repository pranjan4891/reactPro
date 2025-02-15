// export class CreateGuestDto {}



import { IsString, IsEmail, IsNotEmpty, IsOptional, IsBoolean, IsEnum, IsPhoneNumber, Matches, Max, isBoolean ,isEnum, IsMobilePhone, isDate, IsDate} from 'class-validator';
// import { Type } from 'class-transformer';
// import { Prop } from '@nestjs/mongoose';
// import { Types } from 'mongoose';
// import { Department } from 'src/schemas/department.enum';
// import { Role } from 'src/schemas/role.enum';
// import { Status } from 'src/schemas/status.enum';
export class CreateGuestDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsString()
    middleName: string;
    
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsMobilePhone()
    phone: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    location: string;
    
    @IsNotEmpty()
    // @IsDate()
    date: string;
  
    @IsNotEmpty()
    @IsString()
    venue: string;

    @IsNotEmpty()
    @IsString()
    manager: string;

    @IsNotEmpty()
    @IsString()
    consultant: string;

    @IsBoolean()
    afFormGenerated: boolean;

    @IsOptional()
    @IsBoolean()
    isVoucherSent?: boolean;

}





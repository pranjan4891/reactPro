// export class CreateAfformDto {}




import { IsString, IsEmail, IsNotEmpty, IsOptional, IsBoolean, IsEnum, IsPhoneNumber, Matches, Max, isBoolean ,isEnum, IsMobilePhone, isDate, IsDate} from 'class-validator';
// import { Type } from 'class-transformer';
// import { Prop } from '@nestjs/mongoose';
// import { Types } from 'mongoose';
// import { Department } from 'src/schemas/department.enum';
// import { Role } from 'src/schemas/role.enum';
// import { Status } from 'src/schemas/status.enum';
export class CreateAfformDto {
    @IsNotEmpty()
    @IsString()
    userid: string; // UserId;

    @IsNotEmpty()
    @IsString()
    tempAfNo: string; // Temporary A.F. N: string;
    
    @IsNotEmpty()
    @IsString()
    dated: string; // Date
    
    @IsString()
    picture: string; // Picture file path or URL
    
    @IsString()
    applicantTitle: string; // Applicant Title (Mr, Mrs, Ms)
    
    @IsNotEmpty()
    @IsString()
    applicantFirstName: string;
    
    @IsString()
    applicantMiddleName: string;
    
    @IsNotEmpty()
    @IsString()
    applicantLastName: string;
    
    @IsString()
    applicantDateOfBirth: string;
    
    @IsString()
    applicantMarriageAnniversary: string;
    
    @IsString()
    coApplicantTitle: string; // Co-Applicant Title (Mr, Mrs, Ms)
    
    @IsString()
    coApplicantFirstName: string;
    
    @IsString()
    coApplicantMiddleName: string;
    
    @IsString()
    coApplicantLastName: string;
    
    @IsString()
    nominee1Name: string;
    
    @IsString()
    nominee1DateOfBirth: string;
    
    @IsString()
    nominee2Name: string;
    
    @IsString()
    nominee2DateOfBirth: string;
    
    @IsString()
    nominee3Name: string;

    @IsString()
    nominee3DateOfBirth: string;
    
    @IsNotEmpty()
    @IsString()
    applicantCorrespondenceAddress: string;
    
    @IsString()
    applicantPincode: string;
    
    @IsString()
    applicantEmail: string;
    
    @IsString()
    applicantPhoneResidential: string;
    
    @IsString()
    applicantPhoneOffice: string;
    
    @IsString()
    applicantMobile01: string;
    
    @IsString()
    applicantMobile02: string;
    
    @IsString()
    plan: string;
    
    @IsString()
    remarks: string;
    
    @IsString()
    specialOfferDetails: string;
    
    @IsString()
    specialOfferWorth: string;
    
    @IsString()
    specialOfferMonthOfExpiration: string;
    
    @IsString()
    mainApplicantName: string;
    
    @IsString()
    coApplicantName: string;
    
    @IsString()
    manager: string;
    
    @IsString()
    consultant: string;

}





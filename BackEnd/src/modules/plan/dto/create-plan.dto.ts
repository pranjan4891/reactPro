import { IsString, IsNotEmpty, IsBoolean, IsEnum, IsNumber, isString } from 'class-validator';

export class CreatePlanDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    // @IsString()
    // @IsNotEmpty()
    // type: string;


    @IsString()
    @IsNotEmpty()
    tenure: string;
    
    @IsString()
    @IsNotEmpty()
    nightsAvailable: string;
    
    @IsString()
    @IsNotEmpty()
    currency: string;
    
    @IsString()
    @IsNotEmpty()
    basePrice: string;
    
    @IsString()
    @IsNotEmpty()
    minimumPrice: string;
    
    @IsString()
    @IsNotEmpty()
    amcCharges: string;
    
    @IsString()
    @IsNotEmpty()
    noOfDaysForIntiationBeforeBooking: string;
    
    @IsString()
    planDescription: string;
    
    @IsString()
    bookingSpecialComment: string;

    @IsString()
    isActive: string;

    // @IsNumber()
    // @IsNotEmpty()
    // ammount: number;
}

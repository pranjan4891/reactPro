import { IsString, IsNotEmpty, IsDateString, Max, IsBoolean, IsEnum } from 'class-validator';
import { Status } from 'src/schemas/status.enum';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  venueName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  address: string;
  
   
  @IsEnum(Status)  // Ensures the value is one of the enum options
  status: Status;
}

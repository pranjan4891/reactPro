import { IsString, IsNotEmpty, IsBoolean, IsEnum } from 'class-validator';
import { Status } from 'src/schemas/status.enum';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsEnum(Status)  // Ensures the value is one of the enum options
  status: Status;
}

import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateFinalChoiceDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}

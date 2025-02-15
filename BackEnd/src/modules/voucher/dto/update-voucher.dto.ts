import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsDateString,
  ArrayNotEmpty,
  IsDefined,
} from 'class-validator';

export class UpdateVoucherDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'Choices array must not be empty.' }) // Ensures choices is a non-empty array
  @IsString({ each: true, message: 'Each choice must be a string.' })
  @IsDefined({ message: 'Choices field is required.' }) // Ensures choices is defined
  choices: string[];

  @IsArray()
  @ArrayNotEmpty({ message: 'Dates array must not be empty.' }) // Ensures dates is a non-empty array
  @IsDateString(
    {},
    { each: true, message: 'Each date must be a valid date string.' },
  )
  @IsDefined({ message: 'Dates field is required.' }) // Ensures dates is defined
  dates: string[];
}

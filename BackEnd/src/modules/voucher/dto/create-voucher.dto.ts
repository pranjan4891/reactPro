import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVoucherDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  // @IsNotEmpty()
  // @IsDate()
  // generatedDate: Date;

  // @IsNotEmpty()
  // @IsDate()
  // expiryDate: Date;

  @IsOptional()
  @IsBoolean()
  isMovieVoucher: boolean;

  // @IsNotEmpty()
  // @IsBoolean()
  // status: boolean;
}

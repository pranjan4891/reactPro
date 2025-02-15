import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsMobilePhone,
} from 'class-validator';
import { Role } from '../../schemas/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role?: Role = Role.USER; // Optional, default is USER
}

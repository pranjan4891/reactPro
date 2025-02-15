import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup endpoints
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    let data = await this.authService.signup(createUserDto);

    return {
      msg: 'User created Successfully',
      data: data,
      httpStatusCode: 201,
    };
  }

  // Login endpoint
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);
    if (!data) {
      throw new BadRequestException('Invalid credentials');
    }
    return {
      msg: 'Logged in Successfully',
      data: data,
      httpStatusCode: 200, // Explicitly set HTTP Status Code to 200
    };
  }
}

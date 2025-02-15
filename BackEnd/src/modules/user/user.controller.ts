import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../schemas/user.schema'; // Adjust the path as necessary
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all users
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Get a user by ID
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}

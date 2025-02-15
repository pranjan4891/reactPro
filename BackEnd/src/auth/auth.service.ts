import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // Signup logic
  async signup(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    try {
      const { email, password, username, mobile, role } = createUserDto;

      // Check if the user already exists by email, username, or mobile
      const existingUser = await this.userModel
        .findOne({ $or: [{ email }, { username }, { mobile }] })
        .exec();
      if (existingUser) {
        throw new BadRequestException({
          msg: 'User already exists',
          errors: null,
        });
      }

      // Hash the password before saving the user
      const hashedPassword = await argon.hash(password);

      // Create the new user and save both hashed and plain password
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword, // Store hashed password
        password_visible: password, // Store plain password in password_visible
      });

      await newUser.save();

      // Generate JWT token with role included
      const payload = {
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
      };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred, please try again later.',
      );
    }
  }

  // Login logic
  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: any }> {
    const { email, password } = loginDto;

    try {
      // Find user by email or username
      const user = await this.userModel
        .findOne({
          $or: [{ email }, { username: email }],
        })
        .select('+password')
        .exec();

      if (!user) {
        throw new BadRequestException({
          message: 'Email/Username not found',
          errors: {
            email: [
              'Email/Username not found in our records. Please check the details.',
            ],
          },
        });
      }

      // Validate password
      const isPasswordValid = await argon.verify(user.password, password);
      if (!isPasswordValid) {
        throw new BadRequestException({
          message: 'Password does not match',
          errors: {
            password: ['Please check your password.'],
          },
        });
      }

      // Generate JWT token
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
        // status: user.status,
      };
      const accessToken = this.jwtService.sign(payload);

      // Return the response with the token and user details
      return {
        accessToken,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          // status: accountStatus,
        },
      };
    } catch (error) {
      // Catch any unexpected errors and throw a 500 Internal Server Error
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred, please try again later.',
      );
    }
  }
}

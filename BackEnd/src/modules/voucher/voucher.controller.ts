import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/middleware/jwt-payload.interface';
import { UpdateFinalChoiceDto } from './dto/UpdateFinalChoice.dto';
import { PaymentStatusDto } from './dto/paymentStatus.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createVoucherDto: CreateVoucherDto, @Req() req: any) {
    const user: JwtPayload = req.user;

    console.log(user, '<=== user');
    try {
      // Call the service method to create the voucher
      return await this.voucherService.create(createVoucherDto, user);
    } catch (error) {
      // Handle and log errors
      console.error('Error creating voucher:', error);

      // Rethrow the error with an appropriate response
      if (error instanceof BadRequestException) {
        throw error; // Let NestJS handle this exception
      }

      // Return a generic internal server error for other unexpected errors
      throw new InternalServerErrorException(
        'Failed to create voucher. Please try again.',
      );
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    const result = await this.voucherService.findAll(page, limit, search);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      // Wait for the result from the service method
      const result = await this.voucherService.findOne(id);

      return {
        success: true,
        data: result,
        msg: 'Voucher found successfully',
        remarks: 'RESPONSE_SUCCESSFUL',
      };
    } catch (error) {
      // Handle errors if any occur during the request
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error; // rethrow if the error is a known exception
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  @Patch('clientUpdate/:id')
  async update(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    if (!updateVoucherDto) {
      throw new BadRequestException('Payload is missing');
    }
    console.log('result');
    try {
      const result = await this.voucherService.updateChoice(
        id,
        updateVoucherDto,
      );

      return {
        success: true,
        data: result,
        msg: 'Voucher updated successfully',
        remarks: 'RESPONSE_SUCCESSFUL',
      };
    } catch (error) {
      // Handle errors if any occur during the request
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        console.log(error);
        throw error; // rethrow if the error is a known exception
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('finalUpdate/:id')
  async FinalChoiceUpdate(
    @Param('id') id: string,
    @Body() updateFinalChoiceDto: UpdateFinalChoiceDto,
    @Req() req: any,
  ) {
    const user: JwtPayload = req.user;

    if (!updateFinalChoiceDto) {
      throw new BadRequestException('Payload is missing');
    }
    console.log('result');
    try {
      const result = await this.voucherService.updateFinalChoice(
        id,
        user.id,
        updateFinalChoiceDto,
      );

      return {
        success: true,
        data: result,
        msg: 'Voucher updated successfully',
        remarks: 'RESPONSE_SUCCESSFUL',
      };
    } catch (error) {
      // Handle errors if any occur during the request
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        console.log(error);
        throw error; // rethrow if the error is a known exception
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('paymentStatus/:id')
  async paymentUpdate(
    @Param('id') id: string,
    @Body() paymentStatusDto: PaymentStatusDto,
    @Req() req: any,
  ) {
    const user: JwtPayload = req.user;

    if (!paymentStatusDto) {
      throw new BadRequestException('Payload is missing');
    }
    console.log('result');
    try {
      const result = await this.voucherService.paymentUpdate(
        id,
        user.id,
        paymentStatusDto,
      );

      return {
        success: true,
        data: result,
        msg: 'Voucher updated successfully',
        remarks: 'RESPONSE_SUCCESSFUL',
      };
    } catch (error) {
      // Handle errors if any occur during the request
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        console.log(error);
        throw error; // rethrow if the error is a known exception
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }
}

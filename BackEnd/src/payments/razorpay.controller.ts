import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';

@Controller('payments')
export class RazorpayController {
  constructor(private readonly razorpayService: RazorpayService) {}

  @Post('create-order')
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
    try {
      const order = await this.razorpayService.createOrder(createOrderDto);
      return res.status(HttpStatus.OK).json(order);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Payment order creation failed' });
    }
  }
}

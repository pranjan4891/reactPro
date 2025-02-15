import Razorpay from 'razorpay';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from './constants';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './interfaces/order.interface';

export class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const options = {
      amount: orderData.amount * 100, // Convert to paisa
      currency: orderData.currency,
      payment_capture: 1,
    };

    const order = await this.razorpay.orders.create(options);

    return {
      id: order.id,
      entity: order.entity,
      amount: Number(order.amount), // Ensure it's a number
      currency: order.currency,
      status: order.status,
    };
  }
}

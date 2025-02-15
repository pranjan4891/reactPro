import { RazorpayService } from "./razorpay.service";

export class RazorpayModule {
  static register() {
    return {
      provide: RazorpayService,
      useClass: RazorpayService,
    };
  }
}

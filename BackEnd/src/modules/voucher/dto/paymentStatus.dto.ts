import { IsBoolean } from 'class-validator';

export class PaymentStatusDto {
  @IsBoolean()
  paymentReceived: boolean;
}

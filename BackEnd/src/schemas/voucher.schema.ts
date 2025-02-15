import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { VoucherStatus } from './status.enum';

export type VoucherDocument = Voucher & Document;

@Schema({
  collection: 'timesharing_vouchers',
  timestamps: true,
})
export class Voucher {
  @Prop({ required: false, unique: true })
  voucherCode: string;

  @Prop({ required: false })
  customerName: string;

  @Prop({ required: false, unique: true })
  email: string;

  @Prop({ required: false, unique: true })
  phone: string;

  @Prop({ required: false, type: Date })
  generatedDate: Date;

  @Prop({ required: false, type: Date })
  expiryDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  generatedBy: Types.ObjectId;

  @Prop({ type: String, required: false, enum: VoucherStatus })
  status: VoucherStatus;

  @Prop({ type: Array, required: false })
  choices: {
    createdAt: Date;
    choice1: {
      city: string;
      date: Date;
    };
    choice2: {
      city: string;
      date: Date;
    };
    choice3: {
      city: string;
      date: Date;
    };
  }[];
  
  @Prop({ type: Object, required: false })
  currentChoice: {
    createdAt: Date;
    choice1: {
      city: string;
      date: Date;
    };
    choice2: {
      city: string;
      date: Date;
    };
    choice3: {
      city: string;
      date: Date;
    };
  };

  @Prop({ type: Object, required: false })
  finalChoice: {
    createdAt: Date;
    generatedBy: { type: Types.ObjectId; required: true; ref: 'User' };
    city: string;
    date: Date;
  };

  @Prop({ default: false })
  isMovieVoucherSent: boolean;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AfformDocument = Afform & Document;

@Schema({
  collection: 'timesharing_afforms',
  timestamps: true,
})
export class Afform {
  @Prop({ required: true })
  userid: string; // Temporary A.F. No

  @Prop({ required: true })
  tempAfNo: string; // Temporary A.F. No

  @Prop({ required: true })
  dated: string; // Date

  @Prop()
  picture: string; // Picture file path or URL

  @Prop()
  applicantTitle: string; // Applicant Title (Mr, Mrs, Ms)

  @Prop({ required: true })
  applicantFirstName: string;

  @Prop()
  applicantMiddleName: string;

  @Prop({ required: true })
  applicantLastName: string;

  @Prop()
  applicantDateOfBirth: string; // Date of Birth (date)

  @Prop()
  applicantMarriageAnniversary: string; // Marriage Anniversary (date)

  @Prop()
  coApplicantTitle: string; // Co-Applicant Title (Mr, Mrs, Ms)

  @Prop()
  coApplicantFirstName: string;

  @Prop()
  coApplicantMiddleName: string;

  @Prop()
  coApplicantLastName: string;

  @Prop()
  nominee1Name: string;

  @Prop()
  nominee1DateOfBirth: string; // Nominee 1 Date of Birth (date)

  @Prop()
  nominee2Name: string;

  @Prop()
  nominee2DateOfBirth: string; // Nominee 2 Date of Birth (date)

  @Prop()
  nominee3Name: string;

  @Prop()
  nominee3DateOfBirth: string;

  @Prop({ required: true })
  applicantCorrespondenceAddress: string;

  @Prop()
  applicantPincode: string;

  @Prop()
  applicantEmail: string;

  @Prop()
  applicantPhoneResidential: string;

  @Prop()
  applicantPhoneOffice: string;

  @Prop()
  applicantMobile01: string;

  @Prop()
  applicantMobile02: string;

  @Prop()
  plan: string;

  @Prop()
  remarks: string;

  @Prop()
  specialOfferDetails: string;

  @Prop()
  specialOfferWorth: string;

  @Prop()
  specialOfferMonthOfExpiration: string;

  @Prop()
  mainApplicantName: string;

  @Prop()
  coApplicantName: string;

  @Prop()
  manager: string;

  @Prop()
  consultant: string;
}

export const AfformSchema = SchemaFactory.createForClass(Afform);

import { Status } from "../utils/status"

// Initial values for the form fields
export interface AfformIface {
  _id?: string
  // venueName: string
  // location: string
  // startDate: string
  // endDate: string
  // address: string
  // status?: Status,
  userid?: string;
  tempAfNo: string; // Temporary A.F. No
  dated: string; // Date
  picture: string; // Picture file path or URL
  applicantTitle: string; // Applicant Title (Mr, Mrs, Ms)
  applicantFirstName: string;
  applicantMiddleName: string;
  applicantLastName: string;
  applicantDateOfBirth: string; // Date of Birth (date)
  applicantMarriageAnniversary: string; // Marriage Anniversary (date)
  coApplicantTitle: string; // Co-Applicant Title (Mr, Mrs, Ms)
  coApplicantFirstName: string;
  coApplicantMiddleName: string;
  coApplicantLastName: string;
  nominee1Name: string;
  nominee1DateOfBirth: string; // Nominee 1 Date of Birth (date)
  nominee2Name: string;
  nominee2DateOfBirth: string; // Nominee 2 Date of Birth (date)
  nominee3Name: string;
  nominee3DateOfBirth: string; 
  applicantCorrespondenceAddress: string;
  applicantPincode: string;
  applicantEmail: string;
  applicantPhoneResidential: string;
  applicantPhoneOffice: string;
  applicantMobile01: string;
  applicantMobile02: string;
  plan: string;
  remarks: string;
  specialOfferDetails: string;
  specialOfferWorth: string;
  specialOfferMonthOfExpiration: string;
  mainApplicantName: string;
  coApplicantName: string;
  manager: string;
  consultant: string;
};
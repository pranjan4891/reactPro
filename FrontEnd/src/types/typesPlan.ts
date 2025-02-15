import { Status } from "../utils/status"

// Initial values for the form fields
export interface PlanIface {
  // _id?: string
  // name: string
  // type: string
  // ammount: string,
  name: string,
  tenure: string,
  nightsAvailable: string,
  currency: string,
  basePrice: string,
  minimumPrice: string,
  amcCharges: string,
  noOfDaysForIntiationBeforeBooking: string,
  planDescription: string,
  bookingSpecialComment: string,
  isActive: string,
};
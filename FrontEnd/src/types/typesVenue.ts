import { Status } from "../utils/status"

// Initial values for the form fields
export interface VenueIface {
  _id?: string
  venueName: string
  location: string
  startDate: string
  endDate: string
  address: string
  status?: Status,
};
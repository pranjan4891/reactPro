import { Status } from "../utils/status";

export interface EmployeesIface {
  _id?: string
  userName: string;                  // User Name
  email: string;                     // Email
  phoneNumber: string;               // Phone Number
  alternatePhoneNumber?: string;     // Alternate Phone Number
  password: string;                  // Password
  confirmPassword: string;           // Retype the Password
  permanentAddress: string;          // Permanent Address
  alternateAddress?: string;         // Alternate Address
  department: string;                // Select Department
  role: string;                      // Roles
  location: string;                  // Location
  venue: string;                     // Select Venue
  isActive: Status;                 // Is Active?
  employeeImage: File | null; // Allows File or null
  kycImage: File | null;                  // Upload KYC Image
}

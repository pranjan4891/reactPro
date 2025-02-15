export interface GuestIface {
    _id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    location?: string;
    date?: string; // Consider using Date type if you need date manipulation
    venue?: string;
    manager?: string; // Manager select field
    consultant?: string;
    afFormGenerated?: boolean;
}







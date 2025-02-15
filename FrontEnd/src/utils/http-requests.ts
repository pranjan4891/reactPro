import { GuestRegistrationIface } from '../types/GuestsRegistration';
import { EmployeesIface } from '../types/typesEmployees';
import { LocationIface } from '../types/typesLocation';
import { VenueIface } from '../types/typesVenue';
import { PlanIface } from '../types/typesPlan';
import { AfformIface } from '../types/typesAfform';
import api from './axiosConfig';
import { apiEndpoints, API_URL } from './constants/apiEndpoints';
import { buildQueryParams } from './constants/buildQueryParams';
import { VoucherData } from '../types/voucher-generate';

// Define API calls

export const getGuests = async (param: any | null) => {
  // Destructure with default values for optional parameters
  const queryString = buildQueryParams(param || {});
  // Fetch data with dynamically constructed query parameters
  const response = await api.get(
    `${apiEndpoints.guest.fetch}?${queryString}`
  );
  console.log(`Pickup Location Fetched ==> `, response.data);
  return response.data;
};


export const createGuest = async (data: GuestRegistrationIface) => {
  const response = await api.post(apiEndpoints.guest.create, data);
  console.log(`Pickup Location Created ==> `, response.data);
  return response.data;
};

export const getGuestDetails = async (param: any | null) => {
  const { guestId } = param;
  // Fetch data with dynamically constructed query parameters
  const response = await api.get(
    `${apiEndpoints.guest.details}${guestId}`
  );
  // console.log(`Location Fetched ==> `, response.data);
  return response.data;
};

export const updateGuest = async (
  id: string,
  updateGuestData: GuestRegistrationIface
) => {
  const response = await api.patch(
    apiEndpoints.guest.update + id,
    updateGuestData
  );
  return response.data;
};

export const getLocations = async (param: any | null) => {
  // Destructure with default values for optional parameters

  const queryString = buildQueryParams(param || {});
  // console.log(queryString);

  // Fetch data with dynamically constructed query parameters
  const response = await api.get(
    `${apiEndpoints.locations.fetch}?${queryString}`
  );
  // console.log(`Location Fetched ==> `, response.data);
  return response.data;
};

export const addLocation = async (locationData: LocationIface) => {
  const response = await api.post(apiEndpoints.locations.create, locationData);
  console.log(`Location Created ==> `, response.data);
  return response.data;
};

export const updateLocation = async (
  id: string,
  locationData: LocationIface
) => {
  const response = await api.patch(
    apiEndpoints.locations.update + '/' + id,
    locationData
  );
  return response.data;
};

export const getVenue = async (param: any | null) => {
  const queryString = buildQueryParams(param || {});
  const response = await api.get(`${apiEndpoints.venue.fetch}?${queryString}`);
  // console.log(`getVenue Created ==> `, response.data);
  return response.data;
};

export const addVenue = async (venueData: VenueIface) => {
  // console.log(venueData);

  const response = await api.post(apiEndpoints.venue.create, venueData);
  // console.log(`getVenue Created ==> `, response.data);
  return response.data;
};

export const updateVenue = async (id: string, updateVenueData: VenueIface) => {
  const response = await api.patch(
    apiEndpoints.venue.update + '/' + id,
    updateVenueData
  );
  return response.data;
};

export const getAfform = async (param: any | null) => {
  const queryString = buildQueryParams(param || {});
  const response = await api.get(`${apiEndpoints.afform.fetch}?${queryString}`);
  // console.log(`getAfform Created ==> `, response.data);
  return response.data;
};

export const fetchAfformById = async (id: string) => {
  const response = await api.get(apiEndpoints.afform.fetchById(id));
  return response.data;
};

// export const addAfform = async (afformData: AfformIface) => {
//   // console.log(afformData);

//   const response = await api.post(apiEndpoints.afform.create, afformData);
//   // console.log(`addAfform Created ==> `, response.data);
//   return response.data;
// };

// export const addAfform = async (afformData: AfformIface) => {
//   try {
//     const response = await api.post('/afform', afformData);
//     return response.data;
//   } catch (error: any) {
//     // Log the error response for debugging
//     console.error('API Error Response:', error.response?.data);

//     // Throw a user-friendly error message
//     throw new Error('Failed to submit form. Please check your data and try again.');
//   }
// };

export const addAfform = async (afformData: AfformIface) => {
  try {
    // Log request details
    console.log('Request URL:', API_URL + apiEndpoints.afform.create);
    console.log('Request Data:', afformData);

    const response = await api.post(apiEndpoints.afform.create, afformData);
    return response.data;
  } catch (error: any) {
    // Log error details
    console.error('Server Response:', error.response?.data);
    console.error('Status Code:', error.response?.status);

    throw new Error(error.response?.data?.message || 'Failed to submit form');
  }
};

export const updateAfform = async (
  id: string,
  updateAfformData: AfformIface
) => {
  const response = await api.patch(
    apiEndpoints.afform.update + '/' + id,
    updateAfformData
  );
  return response.data;
};

export const getEmployees = async (param: any | null) => {
  const queryString = buildQueryParams(param || {});
  const response = await api.get(
    `${apiEndpoints.employee.fetch}?${queryString}`
  );
  return response.data;
};

export const addEmployees = async (employeedata: EmployeesIface) => {
  const response = await api.post(apiEndpoints.employee.create, employeedata);
  return response.data;
};

export const updateEmployee = async (
  id: string,
  employeedata: EmployeesIface
) => {
  const response = await api.patch(
    apiEndpoints.employee.update + '/' + id,
    employeedata
  );
  return response.data;
};

// Voucher Start

export const GenerateVoucher = async (
  voucherData: VoucherData
): Promise<any> => {
  try {
    const response = await api.post(apiEndpoints.voucher.create, voucherData);
    return response.data; // Assuming the API sends a meaningful response
  } catch (error: any) {
    // Handle errors
    console.error('Error generating voucher:', error);
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while generating the voucher.'
    );
  }
};

export const fetchVouchers = async (param: any | null) => {
  const queryString = buildQueryParams(param || {});
  const response = await api.get(
    `${apiEndpoints.voucher.fetch}?${queryString}`
  );
  return response.data;
};

export const fetchVoucherById = async (id: string) => {
  const response = await api.get(`${apiEndpoints.voucher.fetchOne}/${id}`);
  return response.data;
};

export const clientUpdateChoice = async (voucherId: string, data: any) => {
  const response = await api.patch(
    `${apiEndpoints.voucher.clientUpdate}/${voucherId}`,
    data
  ); // Use the voucherId in the URL
  return response.data;
};

export const finalUpdateChoice = async (voucherId: string, data: any) => {
  const response = await api.patch(
    `${apiEndpoints.voucher.finalUpdate}/${voucherId}`,
    data
  ); // Use the voucherId in the URL
  return response.data;
};

export const updatePaymentStatus = async (voucherId: string, data: any) => {
  const response = await api.patch(
    `${apiEndpoints.voucher.updatePaymentStatus}/${voucherId}`,
    data
  ); // Use the voucherId in the URL
  return response.data;
};

// Voucher End

// New function for image upload
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post(apiEndpoints.upload.image, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Image uploaded successfully:', response.data.file.path);
    return response.data.file.path; // Adjust if the path is returned differently
  } catch (error: any) {
    console.error(
      'Error uploading image:',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || 'Image upload failed');
  }
};

export const getPlan = async (param: any | null) => {
  const queryString = buildQueryParams(param || {});
  const response = await api.get(`${apiEndpoints.plan.fetch}?${queryString}`);
  // console.log(`getPlan Created ==> `, response.data);
  return response.data;
};

export const addPlan = async (planData: PlanIface) => {
  // console.log(planData);

  const response = await api.post(apiEndpoints.plan.create, planData);
  // console.log(`getPlan Created ==> `, response.data);
  return response.data;
};

export const updatePlan = async (id: string, updatePlanData: PlanIface) => {
  const response = await api.patch(
    apiEndpoints.plan.update + '/' + id,
    updatePlanData
  );
  return response.data;
};

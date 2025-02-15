// const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://your-api-url.com';
const API_URL = import.meta.env.VITE_API_URL || 'http://your-api-url.com';

const apiEndpoints = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/user/register`,
  logout: `${API_URL}/user/logout`,
  getUserDetails: `${API_URL}/user/me`,
  updateUser: `${API_URL}/user/update`,
  // Add other API endpoints here as needed

  guest: {
    fetch: `${API_URL}/guest`,
    details: `${API_URL}/guest/`,
    create: `${API_URL}/guest`,
    update: `${API_URL}/guest/`,
  },

  // LOCATION API
  locations: {
    fetch: `${API_URL}/location`,
    create: `${API_URL}/location`,
    update: `${API_URL}/location/update`,
  },

  // Venue API
  venue: {
    fetch: `${API_URL}/venue`,
    create: `${API_URL}/venue`,
    update: `${API_URL}/venue/update`,
  },

  plan: {
    fetch: `${API_URL}/plan`,
    create: `${API_URL}/plan`,
    update: `${API_URL}/plan/update`,
  },

  // Voucher API
  voucher: {
    fetch: `${API_URL}/voucher`,
    create: `${API_URL}/voucher`,
    clientUpdate: `${API_URL}/voucher/clientUpdate`,
    finalUpdate: `${API_URL}/voucher/finalUpdate`,
    updatePaymentStatus: `${API_URL}/voucher/paymentStatus`,
    fetchOne: `${API_URL}/voucher`,
  },

  // afform API
  afform: {
    fetch: `${API_URL}/afform`,
    fetchById: (id: string) => `${API_URL}/afform/${id}`, // Fetch a single afform by ID
    create: `${API_URL}/afform`,
    update: `${API_URL}/afform/update`,
  },

  // Employees API
  employee: {
    fetch: `${API_URL}/employee`,
    create: `${API_URL}/employee`,
    update: `${API_URL}/employee/update`,
  },

  // Image Upload API
  upload: {
    image: `${API_URL}/upload/image`,
  },
};

export { apiEndpoints, API_URL };

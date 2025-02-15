// src/utils/roleBasedRoutes.ts

import { Roles } from './roles';
import {
  ROUTE_URLS,
  commonRoutes,
  adminRoutes,
  salesRoutes,
  welcomeRoutes,
  accessibleToAllRoutes,
} from './constants/routes';

export const roleBasedRoutes = {
  [Roles.Admin]: adminRoutes,
  [Roles.Sales]: salesRoutes,
  [Roles.Welcome]: welcomeRoutes,
  accessibleToAll: accessibleToAllRoutes,
};

/*
// Define a route interface with a default icon value
interface RouteIface {
  path: string;
  label: string;
  title: string;
  icon: string; // No longer optional; defaults set below
  subMenu?: RouteIface[]; // Submenu is an optional array of RouteIface objects;
}

// Common Routes
const commonRoutes: RouteIface[] = [
  { path: '/dashboard', label: 'Dashboard', title: 'Dashboard Overview', icon: 'dashboard-line' },
  { path: '/order', label: 'Orders', title: 'My Order', icon: 'list-view', 
    subMenu : [
      {path: '/new-shipment', label: 'Add New Order', title: 'My Orders', icon: 'inbox-unarchive-line'},
      {path: '/faq', label: 'FAQ', title: 'FAQ', icon: 'help-circle-outline'},
      {path: '/terms-conditions', label: 'Terms & Conditions', title: 'Terms & Conditions', icon: 'document-text-line'},
    ]
  },
  { path: '/pickup-request', label: 'Pickup Request', title: 'Pickup Request', icon: 'box-1-line' },
  { path: '/rate-calculator', label: 'Rate Calculator', title: 'Rate Calculator', icon: 'calculator-line' },
  { path: '/ndr', label: 'NDR', title: 'NDR', icon: 'file-forbid-line' },
  { path: '/report', label: 'Report', title: 'Report', icon: 'file-chart-line' },
  { path: '/settings', label: 'Settings', title: 'Settings', icon: 'settings-3-line' },
  { path: '/support', label: 'Support', title: 'Support', icon: 'customer-service-line'},
  { path: '/information-center', label: 'Information Center', title: 'Information Center', icon: 'article-line',
    subMenu : [
      {path: '/information-center', label: 'Information Center', title: 'Information Center', icon: 'article-line'},
      {path: '/faq', label: 'FAQ', title: 'FAQ', icon: 'help-circle-outline'},
      {path: '/terms-conditions', label: 'Terms & Conditions', title: 'Terms & Conditions', icon: 'document-text-line'},
    ]
  },
];

// Routes for Admin Role
const adminRoutes: RouteIface[] = [
  ...commonRoutes,
  { path: '/users/list', label: 'Manage Users', title: 'Manage Users', icon: 'group-2-line', 
    subMenu:[
      {path: '/users/list', label: 'Users List', title: 'Users List', icon: 'group-line'},
      {path: '/users/permission', label: 'Manage Permission', title: 'Manage Permission', icon: 'list-check-3'},
      {path: '/users/role', label: 'Manage Role', title: 'Manage Role', icon: 'open-arm-line'},
    ]
  },
];

// Routes for Sales Role
const salesRoutes: RouteIface[] = [
  ...commonRoutes,
  { path: '/guests', label: 'Guests', title: 'Guests', icon: 'link-m' },
];

// Routes for Welcome Role
const welcomeRoutes: RouteIface[] = [
  ...commonRoutes,
  { path: '/reports', label: 'Reports', title: 'Welcome Reports', icon: 'link-m' },
];

// Accessible to All Roles
const accessibleToAllRoutes: RouteIface[] = [
  // { path: '/locations', label: 'Locations', title: 'Locations Page', icon: 'link-m' },
  // { path: '/venue', label: 'Venue', title: 'Venue', icon: 'link-m' },
  // { path: '/logout', label: 'Logout', title: 'Logout', icon: 'logout-box-line'}
];

// Role-Based Routes
export const roleBasedRoutes = {
  [Roles.Admin]: adminRoutes,
  [Roles.Sales]: salesRoutes,
  [Roles.Welcome]: welcomeRoutes,
  accessibleToAll: accessibleToAllRoutes,
};

*/

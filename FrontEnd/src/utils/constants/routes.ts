// Define a route interface with a default icon value
interface RouteIface {
  path: string;
  label: string;
  title: string;
  icon: string; // No longer optional; defaults set below
  subMenu?: RouteIface[]; // Submenu is an optional array of RouteIface objects;
  visible?: boolean;
}

// Route constants for URLs
export const ROUTE_URLS = {
  DASHBOARD: '/dashboard',
  Guest: '/guest',
  GuestList: '/guest/list',
  GuestEdit: '/edit-guest/:guestId',
  AddGuest: '/guest/register',

  vouchers: '/vouchers',

  // greetings routes
  Greetings: '/greetings',
  Greeting_Add: '/greetings/add',

  Approval_Form: '/approval_form',
  Change_Renew_Plans: '/renew_plans',
  Upgrade: '/upgrade',
  Downgrade: '/downgrade',
  Renew: '/renew',
  Cancle: '/cancle',
  Approval_Form_List: '/approval-form-list',
  Cancelled_Approval_Form_List: '/cancelled-approval-form-list',
  Payment: '/payment',
  Reports: '/reports',
  Booking_Manager: '/booking-manager',
  Members: '/members',
  Plan: '/plan',
  Masters: '/masters',
  Employees: '/employees',
  Employees_Permissions: '/employees_permission',
  Special_Offer: '/special-offer',
  City: '/city',
  Location: '/location',
  Venue: '/venue',
  Enquiry: '/enquiry',
  Sales_Employees_Master: '/sales-employees-master',
  Sales_Head_Master: '/sales-head-master',
  Sales_Team_Master: '/sales-team-master',
  Sales_Team_Emp: '/sales-team-emp',

  AfForm: '/af-form',
  AfFormList: '/af-form-list',
  AfFormDetails: '/af-form/:id',
  AddPlan: '/add-plan',
  Plans: '/plans',
  RATE_CALCULATOR: '/rate-calculator',
  NDR: '/ndr',
  REPORT: '/report',
  SETTINGS: '/settings',
  SUPPORT: '/support',
  INFORMATION_CENTER: '/information-center',
  USER: '/user',
  USER_LIST: '/user/list',
  USER_PERMISSION: '/user/permission',
  USER_ROLE: '/user/role',
  GUESTS: '/guests',
  REPORTS: '/reports',
};

// Common Routes
export const commonRoutes: RouteIface[] = [
  {
    path: ROUTE_URLS.DASHBOARD,
    label: 'Dashboard',
    title: 'Dashboard Overview',
    icon: 'dashboard-line',
  },
  {
    path: ROUTE_URLS.AddGuest,
    label: 'Add New Guest',
    title: 'Add New Guest',
    icon: 'user-add-line',
  },
  {
    path: ROUTE_URLS.GuestEdit,
    label: 'Edit Guest',
    title: 'Edit Guest',
    icon: 'user-add-line',
    visible: false,
  },
  {
    path: ROUTE_URLS.Guest,
    label: 'Guests',
    title: 'Guests',
    icon: 'group-line',
  },
  {
    path: ROUTE_URLS.vouchers,
    label: 'Vouchers',
    title: 'Vouchers',
    icon: 'discount-percent-line',
  },
  {
    path: ROUTE_URLS.Approval_Form,
    label: 'Approval_Form',
    title: 'Approval_Form',
    icon: 'list-view',
    subMenu: [
      {
        path: ROUTE_URLS.Approval_Form_List,
        label: 'List',
        title: ' List',
        icon: 'box-1-line',
      },
      {
        path: ROUTE_URLS.Cancelled_Approval_Form_List,
        label: 'Cancelled List',
        title: 'Cancelled  List',
        icon: 'box-1-line',
      },
    ],
  },

  {
    path: ROUTE_URLS.Change_Renew_Plans,
    label: 'Renew Plans',
    title: 'Renew Plans',
    icon: 'list-view',
    subMenu: [
      {
        path: ROUTE_URLS.Upgrade,
        label: 'Upgrade',
        title: ' Upgrade',
        icon: 'box-1-line',
      },
      {
        path: ROUTE_URLS.Downgrade,
        label: 'Downgrade',
        title: 'Downgrade',
        icon: 'box-1-line',
      },
      {
        path: ROUTE_URLS.Renew,
        label: 'Renew',
        title: 'Renew',
        icon: 'box-1-line',
      },
      {
        path: ROUTE_URLS.Cancle,
        label: 'Cancle',
        title: 'Cancle',
        icon: 'box-1-line',
      },
    ],
  },
  {
    path: ROUTE_URLS.AddPlan,
    label: 'Add Plan',
    title: 'Add Plan',
    icon: 'box-1-line',
  },
  {
    path: ROUTE_URLS.Plans,
    label: 'Plans',
    title: 'Plans',
    icon: 'box-1-line',
  },
  {
    path: ROUTE_URLS.Location,
    label: 'Location',
    title: 'Location',
    icon: 'box-1-line',
  },
  {
    path: ROUTE_URLS.Venue,
    label: 'Venue',
    title: 'Venue',
    icon: 'box-1-line',
  },
  {
    path: ROUTE_URLS.Employees,
    label: 'Employees',
    title: 'Employees',
    icon: 'box-1-line',
  },
  {
    path: ROUTE_URLS.Greetings,
    label: 'Greetings',
    title: 'Greetings',
    icon: 'service-fill',
    subMenu: [
      {
        path: ROUTE_URLS.Greeting_Add,
        label: 'Add Greeting',
        title: 'Add Greeting',
        icon: 'service-line',
      },
      {
        path: ROUTE_URLS.Greetings,
        label: 'Greeting List',
        title: 'Greeting List',
        icon: 'service-line',
      },
    ],
  },
];

// Routes for Admin Role
export const adminRoutes: RouteIface[] = [
  ...commonRoutes,
  {
    path: ROUTE_URLS.USER_LIST,
    label: 'Manage Users',
    title: 'Manage Users',
    icon: 'group-2-line',
    subMenu: [
      {
        path: ROUTE_URLS.USER_LIST,
        label: 'Users List',
        title: 'Users List',
        icon: 'group-line',
      },
      {
        path: ROUTE_URLS.USER_PERMISSION,
        label: 'Manage Permission',
        title: 'Manage Permission',
        icon: 'list-check-3',
      },
      {
        path: ROUTE_URLS.USER_ROLE,
        label: 'Manage Role',
        title: 'Manage Role',
        icon: 'open-arm-line',
      },
    ],
  },
];

// Routes for Sales Role
export const salesRoutes: RouteIface[] = [
  // ...commonRoutes,
  {
    path: ROUTE_URLS.DASHBOARD,
    label: 'Dashboard',
    title: 'Dashboard Overview',
    icon: 'dashboard-line',
  },
  {
    path: ROUTE_URLS.vouchers,
    label: 'Vouchers',
    title: 'Vouchers',
    icon: 'discount-percent-line',
  },
  {
    path: ROUTE_URLS.GuestList,
    label: 'Guest Registered List',
    title: 'Guest Registered List',
    icon: 'group-line',
  },
  {
    path: ROUTE_URLS.Add_Guest,
    label: 'Add Guest',
    title: 'Add Guest',
    icon: 'group-line',
  },
];

// Routes for Welcome Role
export const welcomeRoutes: RouteIface[] = [
  ...commonRoutes,
  {
    path: ROUTE_URLS.REPORTS,
    label: 'Reports',
    title: 'Welcome Reports',
    icon: 'link-m',
  },
];

// Accessible to All Roles
export const accessibleToAllRoutes: RouteIface[] = [
  // Add accessible routes here when needed
];

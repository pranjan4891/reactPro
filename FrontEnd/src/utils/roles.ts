// src/utils/roles.ts
import {
  ROUTE_URLS,
  commonRoutes,
  adminRoutes,
  salesRoutes,
  welcomeRoutes,
  accessibleToAllRoutes,
} from './constants/routes';

export enum Roles {
  Admin = 'admin',
  Sales = 'sales',
  Welcome = 'welcome',
}

const extractPaths = (routes: any[]): string[] => {
  return routes.flatMap((route) => {
    const basePath =
      ROUTE_URLS[route.path as keyof typeof ROUTE_URLS] || route.path;
    const subMenuPaths = route.subMenu ? extractPaths(route.subMenu) : [];
    return [basePath, ...subMenuPaths]; // Return the path and any submenu paths in a single array
  });
};

export const roleBasedRoutes = {
  [Roles.Admin]: extractPaths(adminRoutes), // Apply ROUTE_URLS mapping to adminRoutes
  [Roles.Sales]: extractPaths(salesRoutes), // Apply the same logic to salesRoutes if needed
  [Roles.Welcome]: extractPaths(welcomeRoutes), // Apply the same logic to welcomeRoutes if needed
  accessibleToAll: accessibleToAllRoutes,
};

console.log(extractPaths(salesRoutes));

/*
  export const roleBasedRoutes = {
    [Roles.Admin]: ['/', '/dashboard', '/users', '/guests', '/order/*', '/reports', '/settings'],
    [Roles.Sales]: ['/', '/dashboard'],
    [Roles.Welcome]: ['/', '/reports'],
    accessibleToAll: ['/locations','/venue'],
  };
  */

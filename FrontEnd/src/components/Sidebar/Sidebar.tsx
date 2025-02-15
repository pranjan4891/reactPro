import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

import { RootState } from '../../store';
import { roleBasedRoutes } from '../../utils/roleBasedRoutes';

interface SidebarProps {
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const [sideBarCollapsed, setSidebarCollapsed] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const location = useLocation();
  const currentPath = location.pathname;

  const role = useSelector((state: RootState) => state.auth.role);
  const allowedRoutes = roleBasedRoutes[role] || [];
  const accessibleRoutes = roleBasedRoutes.accessibleToAll || [];

  // Check if a route is active
  const isActive = (path: string) => currentPath.includes(path);

  // Set the submenu open if the current path matches
  useEffect(() => {
    // Check if 'Order' or 'New Shipment' is part of the current path
    if (isActive('/order') || isActive('/new-shipment')) {
      setOpenSubMenu('Orders'); // Assuming 'Orders' is the label for the submenu
    }

    if (isActive('/user') || isActive('/user/list')) {
      setOpenSubMenu('Manage Users'); // Assuming 'Orders' is the label for the submenu
    }
  }, [currentPath]);

  const handleSubMenuClick = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  const doLogout = () => {
    if (confirm(`Sure you want to log out?`)) {
      window.location.href = `/login`;
    }
  };

  const NavigationMenu: React.FC = () => {
    // Filter out any route that has visible === false
    const menuItems = [...allowedRoutes, ...accessibleRoutes].filter(
      (route) => route.visible !== false
    );

    return menuItems.length > 0 ? (
      <ul>
        {menuItems.map(({ path, label, icon, subMenu }) => (
          <li key={path}>
            {!subMenu ? (
              // For regular menu items
              <Link
                to={path}
                className={`flex items-center mt-1 transition-all gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50 hover:pl-3 hover:text-blue-500 ${
                  (location.pathname === path ||
                    (location.pathname === '/' && path === '/dashboard')) &&
                  'bg-white text-blue-500'
                }`}
                onClick={() => {
                  onNavigate(path);
                  setOpenSubMenu('');
                }}>
                <i className={`ri-${icon} text-purple-500`}></i>
                {label}
              </Link>
            ) : (
              // For menu items with submenus
              <details
                open={openSubMenu === label}
                className={`flex-col group [&_summary::-webkit-details-marker]:hidden flex mt-1 transition-all text-sm font-medium text-slate-700 hover:text-blue-500`}
                onClick={() => handleSubMenuClick(label)}>
                <summary className='flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-slate-700 hover:bg-gray-50 hover:text-blue-500'>
                  <span className='flex items-center gap-2'>
                    <i className={`ri-${icon} text-purple-500`}></i>
                    {label}
                  </span>
                  <i className='ri-arrow-down-s-line group-open:rotate-180'></i>
                </summary>

                {/* Filter submenu items to only include those with visible !== false */}
                <ul className='px-4'>
                  {subMenu
                    .filter((subRoute) => subRoute.visible !== false)
                    .map((subRoute) => (
                      <li key={subRoute.path}>
                        <Link
                          to={subRoute.path}
                          className={`flex items-center gap-2 px-4 text-sm font-medium hover:pl-2 py-2 transition-all text-slate-700 hover:bg-gray-50 hover:text-blue-500 ${
                            isActive(subRoute.path)
                              ? 'bg-white text-blue-500'
                              : ''
                          }`}>
                          <i className={`ri-${subRoute.icon}`}></i>
                          {subRoute.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </details>
            )}
          </li>
        ))}
        <li>
          <div>
            <button
              className='flex w-full items-center bg-transparent border-t border-t-white transition-all gap-2 px-4 py-2 rounded-none text-sm font-medium text-slate-700 hover:bg-white hover:pl-3 hover:text-gray-900'
              onClick={doLogout}>
              <i className='ri-logout-box-line text-purple-500'></i> Logout
            </button>
          </div>
        </li>
      </ul>
    ) : (
      <div>No routes available for this role.</div>
    );
  };

  return (
    <div
      style={{ scrollbarWidth: 'none' }}
      className={`flex h-screen max-h-screen flex-col justify-between rounded-tr-3xl border-t-2 border-t-purple-400 shadow-2xl bg-white bg-gradient-to-bl from-white via-purple-100 to-cyan-200 text-slate-700 transition-all ${
        sideBarCollapsed ? 'w-16' : 'w-64'
      }`}>
      <div className='py-2'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setSidebarCollapsed((prevState) => !prevState)}
            className='bg-transparent text-blue-500 p-1 hover:text-blue-700 focus:outline-none border-none'>
            {sideBarCollapsed ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12'
                />
              </svg>
            )}
          </button>
          {!sideBarCollapsed && (
            <img
              src='/assets/images/thc-logo.png'
              className='w-28'
              alt='Logo'
            />
          )}
        </div>
      </div>

      <div
        style={{ scrollbarWidth: 'none' }}
        className='h-screen py-3 overflow-y-auto'>
        <NavigationMenu />
      </div>

      <div className='sticky inset-x-0 p-2 bottom-0 border-t border-gray-100'>
        <a
          href='#'
          className='flex items-center gap-2'>
          <img
            alt='Profile'
            src='https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            className='size-10 rounded-md object-cover'
          />
          <div>
            <p className='text-xs'>
              <strong className='block font-medium'>Eric Frusciante</strong>
              <span> eric@frusciante.com </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;

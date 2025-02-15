import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store'; // Adjust the path based on your store location
import { toLower } from 'lodash';
import { logout } from '../../store/slices/authSlice';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  // Access the Redux state to get the authenticated user's details
  const user = useSelector(
    (state: RootState) =>
      state.auth.user as { name: string; role: string } | null
  ); // Assuming your Redux state is under 'auth'

  // Toggle the menu
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const doLogout = () => {
    if (confirm(`Sure you want to log out?`)) {
      dispatch(logout());
      window.location.href = `/login`;
    }
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className='relative'
      ref={menuRef}>
      <button
        type='button'
        className='overflow-hidden rounded-full border-2 bg-white border-white p-0 shadow-inner flex items-center justify-center'
        onClick={toggleMenu}>
        <span className='sr-only'>Toggle dashboard menu</span>

        <div
          className='flex'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginRight: '12px',
            paddingLeft: '22px',
            maxWidth: '150px',
            overflow: 'hidden',
            whiteSpace: 'nowrap', // Use whiteSpace instead of text-wrap for no wrapping
            fontSize: '14px',
            textOverflow: 'ellipsis',
            marginTop: '5px',
          }}>
          <h3
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '100px',
              lineHeight: 1,
              textOverflow: 'ellipsis',
            }}>
            <strong>Hi,</strong> {user ? user.name : 'Guest'}
          </h3>
          <h4 className='text-sm text-slate-600 capitalize'>
            {user && toLower(user.role)}
          </h4>
        </div>

        <img
          src='/assets/images/avatar.png'
          alt='Profile'
          className='size-10 object-cover'
        />
      </button>

      {isOpen && (
        <div
          className='absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg'
          role='menu'>
          {/* <div className="p-2">
            <a
              href="#"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              My profile
            </a> */}
          <div className='p-2'>
            <Link
              to='order/b2b-new-shipment'
              className='block rounded-lg px-4 py-2 bg-slate-900 text-sm text-gray-300 hover:bg-gray-800 hover:text-gray-300'
              role='menuitem'>
              Add New Order
            </Link>

            <Link
              to='order/list'
              className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              role='menuitem'>
              My Orders
            </Link>

            <a
              href='#'
              className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              role='menuitem'>
              Information Center
            </a>

            <Link
              to='/my-account'
              className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              role='menuitem'>
              My Account
            </Link>
          </div>

          <div className='p-2'>
            <button
              className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
              role='menuitem'
              onClick={doLogout}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-4'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

import React, { FC } from 'react';
import './dashboard.module.css';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Dashboard: FC = () => {
  return (
    <div className='p-5 h-full w-full'>
      <div className='flex gap-4 '>
        <div className='flex w-3/12 bg-white text-gray-600 shadow-xl border rounded-md p-5 pb-0 items-end'>
          <div className='w-8/12 flex flex-col h-full flex-1'>
            <div>
              <h3 className='font-bold text-xl text-slate-700'>
                Welcome <span>Admin</span>
              </h3>
              <p className='font-medium text-sm text-gray-400'>
                Manage your Vouchers
              </p>
            </div>
            <div className='text-2xl text-purple-600 mt-2 mb-4'>
              <span className='text-sm text-slate-400'>Total Vouchers</span>
              <strong>1k</strong>
            </div>
            <div>
              <Link
                to='/order/list'
                className='btn btn-sm btn-primary rounded-md mb-5 w-auto'>
                View Vouchers
              </Link>
            </div>
          </div>
          <div className='w-4/12'>
            <img
              src='/assets/images/user1.png'
              className='max-w-full'
              alt=''
            />
          </div>
        </div>

        <div className='flex flex-col w-6/12 bg-white shadow-lg p-5 rounded-lg border'>
          <div className='flex flex-1 justify-between'>
            <div>
              <h3 className='font-bold text-slate-700 text-lg flex items-center gap-3'>
                <Activity className='text-green-600' /> Statistics
              </h3>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500'>
                Updated 1 Minute Ago
              </p>
            </div>
          </div>
          {/* <div className="grid grid-cols-4"> */}
          <div className='flex justify-between flex-wrap'>
            <div className='flex gap-3 items-end'>
              <div className='bg-cyan-200 text-cyan-700 rounded-lg items-center flex justify-center text-center w-12 h-12'>
                <i className='ri-group-line'></i>
              </div>
              <div className='text-gray-700'>
                <h6 className='font-bold text-xl leading-none'>15000</h6>
                <p className='font-medium text-sm leading-none mt-1 text-gray-500'>
                  Guests
                </p>
              </div>
            </div>

            <div className='flex gap-3 items-end'>
              <div className='bg-sky-200 text-sky-700 rounded-lg items-center flex justify-center text-center w-12 h-12'>
                <i className='ri-group-line'></i>
              </div>
              <div className='text-gray-700'>
                <h6 className='font-bold text-xl leading-none'>15</h6>
                <p className='font-medium text-sm leading-none mt-1 text-gray-500'>
                  Vouchers
                </p>
              </div>
            </div>

            <div className='flex gap-3 items-end'>
              <div className='bg-pink-200 text-pink-700 rounded-lg items-center flex justify-center text-center w-12 h-12'>
                <i className='ri-map-pin-line'></i>
              </div>
              <div className='text-gray-700'>
                <h6 className='font-bold text-xl leading-none'>15</h6>
                <p className='font-medium text-sm leading-none mt-1 text-gray-500'>
                  AF Froms
                </p>
              </div>
            </div>

            <div className='flex gap-3 items-end'>
              <div className='bg-green-200 text-green-700 rounded-lg items-center flex justify-center text-center w-12 h-12'>
                <i className='ri-group-line'></i>
              </div>
              <div className='text-gray-700'>
                <h6 className='font-bold text-xl leading-none'>15</h6>
                <p className='font-medium text-sm leading-none mt-1 text-gray-500'>
                  Venues
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid w-3/12 grid-cols-2 gap-2 text-gray-600 '>
          <Link
            to={'/order/list'}
            className='flex items-center bg-pink-100 p-2 px-3 rounded-md shadow-md gap-2'>
            <i className='ri-order-play-fill mr-2 text-2xl text-pink-800'></i>
            <h2 className='text-sm text-slate-800 leading-none'>
              View <span className='block text-lg text-pink-800'>Vouchers</span>
            </h2>
          </Link>

          <Link
            to={'/pickup-locations'}
            className='flex items-center bg-sky-100 p-2 rounded-md shadow-md'>
            <i className='ri-user-6-line mr-2 text-2xl text-sky-800'></i>
            <h2 className='text-sm text-slate-800 leading-none'>
              Add <span className='block text-lg text-sky-800'>Guest</span>
            </h2>
          </Link>
          <Link
            to={'/pickup-request'}
            className='flex items-center bg-violet-100 p-2 rounded-md shadow-md opacity-20'>
            <i className='ri-box-1-line mr-2 text-2xl text-violet-800'></i>
            <h2 className='text-sm text-slate-800 leading-none'>
              View{' '}
              <span className='block text-lg text-violet-800'>
                Pickup Requests
              </span>
            </h2>
          </Link>
          <Link
            to={'/my-account/profile'}
            className='flex items-center bg-cyan-100 p-2 rounded-md shadow-md opacity-20'>
            <i className='ri-user-6-line mr-2 text-2xl text-cyan-800'></i>
            <h2 className='text-sm text-slate-800 leading-none'>
              View{' '}
              <span className='block text-lg text-cyan-800'>My Account</span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React from "react";
import React, { FC, useCallback, useState } from 'react';
import { getPlan } from '../../utils/http-requests';
import { APIResponseIface } from '../../types/api-response';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const PlansList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch, isFetching, isPending } = useQuery<
    APIResponseIface,
    Error
  >({
    queryKey: ['plan'],
    queryFn: getPlan,
  });

  console.log(data?.data);

  const handleAddPlan = async (userid: any) => {
    navigate('/add-plan');
  };

  // Header Component
  const Header: FC<{ success: boolean | undefined }> = ({ success }) => (
    <div
      style={{ paddingInline: '10px' }}
      className='flex py-1 justify-between items-center w-full'>
      <h2 className='font-bold text-lg'>
        <i className='ri-store-3-line'></i> Plans
      </h2>
      {success && (
        <div className='flex'>
          <SearchBar />
          <button
            onClick={handleAddPlan}
            className='h-10 px-5 flex items-center bg-cyan-500 shadow-sm rounded-full text-white hover:bg-cyan-600 text-sm'>
            Add New Plan
          </button>
        </div>
      )}
    </div>
  );

  // SearchBar Component
  const SearchBar: FC = () => (
    <div className='relative mr-2'>
      <label
        htmlFor='Search'
        className='sr-only'>
        Search
      </label>
      <input
        type='text'
        id='Search'
        placeholder='Search for...'
        className={`h-10 w-full rounded-full border-gray-200 py-2 pe-16 shadow-sm sm:text-sm min-w-72`}
      />
      <button
        type='button'
        className='absolute text-gray-600 bg-slate-300 rounded-full hover:text-gray-700 top-1/2 transform -translate-y-1/2 px-3 right-0'
        style={{
          height: 'calc(100% - 4px)', // Adjusts the button height slightly smaller than the input
          borderRadius: '9999px', // Ensures full rounding for the button
        }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-4 h-4'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div className='min-h-screen flex w-full'>
      <div className='w-full shadow-md'>
        <Header success={data?.success} />
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
            <thead className='ltr:text-left rtl:text-right'>
              <tr>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-start text-gray-900'>
                  Plan Name
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Tenure
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Nights Available
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Base Price
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Minimum Price
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  AMC Fee
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Intimation Days
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Edit
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {data?.data.map((plan: any, index: any) => (
                <tr key={index}>
                  <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                    {plan?.name}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                    {plan?.tenure}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                    {plan?.nightsAvailable}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                    {plan?.currency}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                    {plan?.basePrice}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                    {plan?.minimumPrice}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                    {plan?.amcCharges}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                    {plan?.noOfDaysForIntiationBeforeBooking}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-center'>
                    {plan?.isActive == 'true' ? (
                      <div className='p-2 text-success font-bold'>⦿ Active</div>
                    ) : (
                      'Not Active'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlansList;

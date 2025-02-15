import React from 'react';
import { formatDate } from '../../../utils/formatDate';

interface ViewChoicesProps {
  voucher: any;
}

const ViewChoices: React.FC<ViewChoicesProps> = ({ voucher }) => {
  return (
    <div className='p-6'>
      <p className='text-sm text-gray-600 mb-4'>
        Shows Choices and travel dates selected by Customer for Voucher{' '}
        <span className='text-lg font-semibold ml-1 text-purple-500'>
          {voucher.voucherCode}
        </span>
      </p>

      <div className='grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-lg'>
        <div className='bg-white p-3 rounded shadow-sm'>
          <div className='font-medium mb-2 text-gray-700'>Date 1*</div>
          <div className='text-sm text-gray-600'>
            {formatDate(voucher?.currentChoice?.choice1?.date)}
          </div>
        </div>
        <div className='bg-white p-3 rounded shadow-sm'>
          <div className='font-medium mb-2 text-gray-700'>Date 2*</div>
          <div className='text-sm text-gray-600'>
            {formatDate(voucher?.currentChoice?.choice2?.date)}
          </div>
        </div>
        <div className='bg-white p-3 rounded shadow-sm'>
          <div className='font-medium mb-2 text-gray-700'>Date 3*</div>
          <div className='text-sm text-gray-600'>
            {formatDate(voucher?.currentChoice?.choice3?.date)}
          </div>
        </div>
        <div className='bg-white p-3 rounded shadow-sm'>
          <div className='font-medium mb-2 text-gray-700'>Destination 1*</div>
          <div className='text-sm text-gray-600'>
            {voucher?.currentChoice?.choice1?.city}
          </div>
        </div>
        <div className='bg-white p-3 rounded shadow-sm'>
          <div className='font-medium mb-2 text-gray-700'>Destination 2*</div>
          <div className='text-sm text-gray-600'>
            {voucher?.currentChoice?.choice2?.city}
          </div>
        </div>
        <div className='bg-white p-3 rounded shadow-sm'>
          <div className='font-medium mb-2 text-gray-700'>Destination 3*</div>
          <div className='text-sm text-gray-600'>
            {voucher?.currentChoice?.choice3?.city}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg'>
        <div className='bg-white p-3 rounded shadow-sm'>
          <div className='font-medium mb-2 text-gray-700'>Final Date:</div>
          <div className='text-sm text-gray-400'>
            {formatDate(voucher?.finalChoice?.date) || 'Not selected yet'}
          </div>
        </div>
        <div className='bg-white p-3 rounded shadow-sm'>
          <div className='font-medium mb-2 text-gray-700'>
            Final Destination:
          </div>
          <div className='text-sm text-gray-400'>
            {voucher?.finalChoice?.city || 'Not selected yet'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewChoices;

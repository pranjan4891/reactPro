import { updatePaymentStatus } from '../../../utils/http-requests';
import { formatDate } from '../../../utils/formatDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

interface ViewChoicesProps {
  voucher: any;
}

const PaymentUpdate: React.FC<ViewChoicesProps> = ({ voucher }) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateMutation = useMutation({
    mutationFn: () =>
      updatePaymentStatus(voucher._id, { paymentReceived: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['voucher', voucher._id],
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateMutation.mutate();
  };

  return (
    <div className='bg-gray-50 p-4 rounded-lg space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
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

      <form
        onSubmit={handleSubmit}
        className='border-t pt-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h3 className='font-medium text-gray-700'>Update Payment Status</h3>
            <p className='text-sm text-gray-500'>
              Confirm payment received and mark voucher as paid
            </p>
          </div>

          <button
            type='submit'
            disabled={isSubmitting || voucher.status === 'PAYMENT_RECEIVED'}
            className={`px-4 py-2 rounded-md ${
              voucher.status === 'PAYMENT_RECEIVED'
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            } transition-colors`}>
            {isSubmitting ? 'Processing...' : 'Mark as Paid'}
          </button>
        </div>

        {updateMutation.isError && (
          <div className='mt-2 text-red-600 text-sm'>
            Error updating payment status:{' '}
            {(updateMutation.error as Error).message}
          </div>
        )}

        {updateMutation.isSuccess && (
          <div className='mt-2 text-green-600 text-sm'>
            Payment status updated successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentUpdate;

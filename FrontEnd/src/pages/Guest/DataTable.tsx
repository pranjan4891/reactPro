import React, { FC, useState } from 'react';
import { GuestIface } from '../../types/Guest';
import { useNavigate } from 'react-router-dom';
import { GenerateVoucher, updateGuest } from '../../utils/http-requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface DataTableProps {
  locations: GuestIface[];
  updateStatus?: (id: string, currentStatus: string) => void;
}

interface ErrorResponse {
  msg: string;
  statusCode: number;
  success: boolean;
}

const DataTable: FC<DataTableProps> = ({ locations, updateStatus }) => {
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    } | null;
  }>({ isOpen: false, data: null });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const headers = [
    'Name',
    'Email',
    'Phone',
    'Location',
    'Date',
    'Venue',
    'Voucher',
    'AF Form',
    'Edit',
  ];

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const sendVoucherMutation = useMutation({
    mutationFn: GenerateVoucher,
    onSuccess: () => {
      setSuccessMessage('Voucher sent successfully!');
      setErrorMessage(null);
      setTimeout(() => {
        setSuccessMessage(null);
        setModalData({ isOpen: false, data: null });
      }, 2000);
      queryClient.invalidateQueries({ queryKey: ['voucher'] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Failed to send voucher:', error);
      const errorMsg =
        error.response?.data?.msg ||
        'Failed to send voucher. Please try again.';
      setErrorMessage(errorMsg);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    },
  });

  const handleAfFormGenerate = async (userid: any) => {
    navigate('/af-form', { state: { userid } });
    console.log('AF Form Generated!!');
  };

  const openVoucherModal = ({
    firstName,
    lastName,
    email,
    phone,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    setModalData({
      isOpen: true,
      data: { firstName, lastName, email, phone },
    });
    setErrorMessage(null);
  };

  const handleVoucherSend = async (isMovieVoucher: boolean) => {
    if (modalData.data) {
      const { firstName, lastName, email, phone } = modalData.data;
      try {
        await sendVoucherMutation.mutateAsync({
          customerName: `${firstName} ${lastName}`,
          email,
          phone,
          isMovieVoucher,
        });
      } catch (error) {
        // Error handling is done in mutation's onError
        console.error('Error sending voucher:', error);
      }
    }
  };

  return (
    <>
      <table className='min-w-full divide-y-2 divide-gray-200 rounded-sm bg-white text-gray-200 text-sm'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className='bg-white px-4 py-2 font-medium text-left text-gray-900'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {locations.map(
            ({
              _id,
              firstName,
              lastName,
              email,
              phone,
              location,
              venue,
              date,
              afFormGenerated,
            }) => (
              <tr key={_id}>
                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  {firstName} {lastName}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {email}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {phone}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {location}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {date}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {venue}
                </td>
                <td className='whitespace-nowrap px-4 py-2'>
                  <button
                    onClick={() =>
                      openVoucherModal({
                        firstName: firstName ?? '',
                        lastName: lastName ?? '',
                        email: email ?? '',
                        phone: phone ?? '',
                      })
                    }
                    className='btn bg-purple-700 border-none text-white hover:bg-purple-400'
                    disabled={sendVoucherMutation.isPending}>
                    {sendVoucherMutation.isPending ? 'Sending...' : 'Generate'}
                  </button>
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {afFormGenerated ? (
                    <button className='btn bg-green-500 hover:bg-green-400 border-none text-white cursor-not-allowed'>
                      Generated
                    </button>
                  ) : (
                    <button
                      className='btn bg-purple-700 border-none text-white hover:bg-purple-400'
                      onClick={() => handleAfFormGenerate(_id)}
                      type='submit'>
                      Generate
                    </button>
                  )}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  <button
                    className='btn btn-md bg-purple-700 border-none text-white hover:bg-purple-400'
                    onClick={() => navigate(`/edit-guest/${_id}`)}>
                    Edit
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {modalData.isOpen && modalData.data && (
        <Modal
          isOpen={modalData.isOpen}
          title='Select Voucher Type'
          message={`Send voucher to ${modalData.data.firstName} ${modalData.data.lastName}`}
          onClose={() => setModalData({ isOpen: false, data: null })}
          onConfirm={handleVoucherSend}
          isLoading={sendVoucherMutation.isPending}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default DataTable;

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: (isMovieVoucher: boolean) => void;
  isLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  isLoading,
  successMessage,
  errorMessage,
}) => {
  const [selectedType, setSelectedType] = useState<'movie' | 'regular'>(
    'regular'
  );

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4'>
        {successMessage ? (
          <div className='text-center py-8'>
            <div className='mb-4 text-green-500'>
              <svg
                className='w-16 h-16 mx-auto'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              {successMessage}
            </h3>
          </div>
        ) : (
          <>
            <h3 className='text-2xl font-bold mb-2 text-gray-800'>{title}</h3>
            <p className='text-gray-600 mb-6'>{message}</p>

            {errorMessage && (
              <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-red-600 text-sm'>{errorMessage}</p>
              </div>
            )}

            <div className='space-y-4 mb-8'>
              <div className='flex items-center space-x-4'>
                <button
                  onClick={() => setSelectedType('regular')}
                  disabled={isLoading}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    selectedType === 'regular'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <h4 className='font-semibold text-sm text-gray-800 mb-1'>
                    Without Movie Voucher
                  </h4>
                  <p className='text-md text-gray-600'>
                    Send email without movie voucher
                  </p>
                </button>

                <button
                  onClick={() => setSelectedType('movie')}
                  disabled={isLoading}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    selectedType === 'movie'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <h4 className='font-semibold text-gray-800 mb-1'>
                    Movie Voucher
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Special movie ticket voucher
                  </p>
                </button>
              </div>
            </div>

            <div className='flex justify-end gap-4'>
              <button
                className='px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium disabled:opacity-50'
                onClick={onClose}
                disabled={isLoading}>
                Cancel
              </button>
              <button
                className='px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 flex items-center'
                onClick={() => onConfirm(selectedType === 'movie')}
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'>
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Voucher'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

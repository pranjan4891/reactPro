import { TicketPercent } from 'lucide-react';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchVouchers, GenerateVoucher } from '../../utils/http-requests';
import { APIResponseIface } from '../../types/api-response';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '../../utils/formatDate';
import VoucherModal from './VoucherModal/VoucherModal';
import { VoucherStatus } from '../../utils/status';

// change folder name

interface Voucher {
  _id: string;
  voucherCode: string;
  customerName: string;
  email: string;
  phone: string;
  generatedDate: string;
  expiryDate: string;
  generatedBy: {
    name: string;
  };
  status: string;
  currentChoice?: boolean;
}

function Vouchers() {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    data: {
      customerName: string;
      email: string;
      phone: string;
    } | null;
  }>({ isOpen: false, data: null });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const statusColors: any = {
    [VoucherStatus.EMAIL_SENT]: 'bg-blue-100 text-blue-800',
    [VoucherStatus.CUSTOMER_FILLED_CHOICES]: 'bg-yellow-100 text-yellow-800',
    [VoucherStatus.MODIFIED]: 'bg-purple-100 text-purple-800',
    [VoucherStatus.FINAL_CHOICE]: 'bg-indigo-100 text-indigo-800',
    [VoucherStatus.PAYMENT_RECEIVED]: 'bg-green-100 text-green-800',
  };

  console.log(errorMessage, 'setErrorMessage');

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<APIResponseIface, Error>({
    queryKey: ['voucher'],
    queryFn: fetchVouchers,
  });

  const sendVoucherMutation = useMutation({
    mutationFn: GenerateVoucher,
    onSuccess: () => {
      setSuccessMessage('Voucher sent successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
        setModalData({ isOpen: false, data: null });
      }, 2000);
      queryClient.invalidateQueries({ queryKey: ['voucher'] });
    },
    onError: (error: any) => {
      console.error('Failed to send voucher:', error);
      setErrorMessage(
        error?.response?.data?.msg ||
          'Failed to send voucher. Please try again.'
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    },
  });

  const openVoucherModal = ({
    customerName,
    email,
    phone,
  }: {
    customerName: string;
    email: string;
    phone: string;
  }) => {
    setModalData({
      isOpen: true,
      data: { customerName, email, phone },
    });
  };

  const handleVoucherSend = async (isMovieVoucher: boolean) => {
    if (modalData.data) {
      const { customerName, email, phone } = modalData.data;
      try {
        await sendVoucherMutation.mutateAsync({
          customerName,
          email,
          phone,
          isMovieVoucher,
        });
      } catch (error) {
        console.error('Error sending voucher:', error);
      }
    }
  };

  const handleSendEmail = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
  };

  return (
    <div className='flex flex-col w-full p-1 px-2 text-sm'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-lg font-extrabold flex gap-1 items-center text-black'>
            <TicketPercent className='text-purple-500 text-xl' /> Vouchers
          </h3>
        </div>
        <div className='flex gap-3'>
          <Link
            to={'/guest-registeration'}
            className='btn btn-sm rounded-full bg-purple-400 shadow-lg hover:shadow-sm hover:bg-purple-500 transition-all'>
            Add new Voucher
          </Link>
          <button className='btn btn-sm rounded-full bg-green-400 shadow-lg hover:shadow-sm hover:bg-green-500 transition-all'>
            Refresh
          </button>
        </div>
      </div>

      <div className='flex flex-1 overflow-y-auto py-1 pb-2'>
        <div className='overflow-x-auto rounded-lg border border-gray-200 w-full'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='whitespace-nowrap px-4 py-3 text-left font-medium text-gray-700'>
                  Voucher Code
                </th>
                <th className='whitespace-nowrap px-4 py-3 text-left font-medium text-gray-700'>
                  Customer Name
                </th>
                <th className='whitespace-nowrap px-4 py-3 text-left font-medium text-gray-700'>
                  Email
                </th>
                <th className='whitespace-nowrap px-4 py-3 text-left font-medium text-gray-700'>
                  Phone
                </th>
                <th className='whitespace-nowrap px-4 py-3 text-left font-medium text-gray-700'>
                  Generated Date
                </th>
                <th className='whitespace-nowrap px-4 py-3 text-left font-medium text-gray-700'>
                  Expiry Date
                </th>
                <th className='whitespace-nowrap px-4 py-3 text-left font-medium text-gray-700'>
                  Generated By
                </th>
                <th className='whitespace-nowrap px-4 py-3 text-left font-medium text-gray-700'>
                  Status
                </th>
                <th className='whitespace-nowrap px-4 py-3 text-left font-medium text-gray-700'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200'>
              {data?.data?.map((voucher: Voucher) => (
                <tr
                  key={voucher._id}
                  className='hover:bg-gray-50'>
                  <td className='whitespace-nowrap px-4 py-3 font-medium text-gray-900'>
                    {voucher.voucherCode}
                  </td>
                  <td className='whitespace-nowrap px-4 py-3 text-gray-700'>
                    {voucher.customerName}
                  </td>
                  <td className='whitespace-nowrap px-4 py-3 text-gray-700'>
                    {voucher.email}
                  </td>
                  <td className='whitespace-nowrap px-4 py-3 text-gray-700'>
                    {voucher.phone}
                  </td>
                  <td className='whitespace-nowrap px-4 py-3 text-gray-700'>
                    {formatDate(voucher.generatedDate)}
                  </td>
                  <td className='whitespace-nowrap px-4 py-3 text-gray-700'>
                    {formatDate(voucher.expiryDate)}
                  </td>
                  <td className='whitespace-nowrap px-4 py-3 text-gray-700'>
                    {voucher.generatedBy.name}
                  </td>
                  <td className='whitespace-nowrap px-4 py-3'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[voucher.status] ||
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {voucher.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className='whitespace-nowrap px-4 py-3'>
                    {voucher.currentChoice ? (
                      <button
                        onClick={() => handleSendEmail(voucher)}
                        className='px-3 py-1.5 text-xs font-medium text-white bg-cyan-500 rounded-full hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-colors'>
                        Send Response
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const { customerName, email, phone } = voucher;
                          openVoucherModal({
                            customerName,
                            email,
                            phone,
                          });
                        }}
                        className='px-3 py-1.5 text-xs font-medium text-white bg-cyan-500 rounded-full hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-colors'
                        disabled={sendVoucherMutation.isPending}>
                        {sendVoucherMutation.isPending
                          ? 'Sending...'
                          : 'Resend Email'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {modalData.isOpen && modalData.data && (
          <Modal
            isOpen={modalData.isOpen}
            title='Want to send movie voucher ?'
            message={`Send voucher to ${modalData.data.customerName}`}
            onClose={() => setModalData({ isOpen: false, data: null })}
            onConfirm={handleVoucherSend}
            isLoading={sendVoucherMutation.isPending}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        )}
      </div>

      <div className='flex items-center mt-4 text-gray-600'>
        <div>Total {data?.total} Records</div>
      </div>

      <VoucherModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        voucher={selectedVoucher}
      />
    </div>
  );
}

export default Vouchers;

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
            <p className='text-gray-600 font-semibold mb-6'>{message}</p>

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

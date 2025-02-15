import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import {
  clientUpdateChoice,
  fetchVoucherById,
} from '../../utils/http-requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import FetchError from '../../components/common/FetchError';
import { formatDate } from '../../utils/formatDate';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { CheckCircleIcon } from 'lucide-react';

const destinations = [
  {
    name: 'Rishikesh',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNYZUplGWutMohDwfKNnnJfLGRCt4KTWXaJQ&s',
  },
  {
    name: 'Shimla',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzqavMlsF4wdbmOG38RofpZ_pANl252VOF0A&s',
  },
  {
    name: 'Haridwar',
    image:
      'https://eastindiantraveller.com/wp-content/uploads/2020/10/fb_img_1602601852796-1.jpg',
  },
  {
    name: 'Shirdi',
    image:
      'https://bhatkantiholidays.com/wp-content/uploads/2020/10/shirdi-sai-baba.jpg',
  },
  {
    name: 'Jodhpur',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Mehrangarh_Fort_sanhita.jpg/800px-Mehrangarh_Fort_sanhita.jpg',
  },
  {
    name: 'Goa',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThg8aecGdrpQr3Vp0CY5NbsBBPAakc3kRscQ&s',
  },
  {
    name: 'Agra',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQylGinfD_KoypPmi_T-CBQZNX76NNIe0uKBg&s',
  },
  {
    name: 'Manali',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYh_UAYx6h6p1Rc7Vs-Md9yk46DqD4clCCmg&s',
  },
  {
    name: 'Jaipur',
    image:
      'https://economictimes.indiatimes.com/thumb/msid-70104165,width-1200,height-900,resizemode-4,imgsize-1445127/jaipur_gettyimages.jpg?from=mdr',
  },
  {
    name: 'Udaipur',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdcU91N73HvpjnNCW5lr9T5e_bqcS3XXT5gg&s',
  },
  {
    name: 'Nainital',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStj0oBbBh9MBJU3dxBnWK7PYms8dBjsVP0Tw&s',
  },
  {
    name: 'Mumbai',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzQYrJFLtEUIo5VdgWsOVubRuoBtlyDXuKaA&s',
  },
];

interface FormData {
  choices: string[];
  dates: string[];
}

export default function ChooseTemplate() {
  const { voucherId } = useParams();

  const [formData, setFormData] = useState<FormData>({
    choices: ['', '', ''],
    dates: ['', '', ''],
  });

  // Fetch voucher details
  const {
    data: voucher,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['voucher', voucherId],
    queryFn: () => fetchVoucherById(voucherId as string),
    enabled: !!voucherId,
  });

  // Handle destination selection logic
  const handleDestinationSelect = (destName: string, index: number) => {
    const newChoices = [...formData.choices];

    if (newChoices[index] === destName) {
      newChoices[index] = '';
    } else {
      const existingIndex = newChoices.indexOf(destName);
      if (existingIndex !== -1) {
        newChoices[existingIndex] = '';
      }
      newChoices[index] = destName;
    }

    setFormData({ ...formData, choices: newChoices });
  };

  const handleImageClick = (destName: string) => {
    const currentIndex = formData.choices.indexOf(destName);
    if (currentIndex !== -1) {
      handleDestinationSelect(destName, currentIndex);
    } else {
      const emptyIndex = formData.choices.findIndex((choice) => choice === '');
      if (emptyIndex !== -1) {
        handleDestinationSelect(destName, emptyIndex);
      }
    }
  };

  const getSelectOptions = (currentIndex: number) => {
    return destinations.map((dest) => ({
      value: dest.name,
      label: dest.name,
      isDisabled:
        formData.choices.includes(dest.name) &&
        formData.choices[currentIndex] !== dest.name,
    }));
  };

  // Mutation to update voucher choice
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (updatedData: { choices: string[]; dates: string[] }) =>
      clientUpdateChoice(voucherId as string, updatedData),
    onSuccess: (data) => {
      console.log('Voucher updated successfully:', data);
      alert('Voucher choices updated successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Error updating voucher:', error);
      alert('An error occurred while updating the voucher choices.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const updatedData = {
      choices: formData.choices,
      dates: formData.dates,
    };

    mutate(updatedData);
  };

  if (isLoading || isPending) {
    return <LoadingSpinner />;
  }

  if (isError)
    return (
      <FetchError
        message='Failed to fetch Voucher Details'
        onRefresh={refetch}
      />
    );

  if (!voucher) return <p>No voucher data found.</p>;

  return (
    <div className='overflow-auto relative w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen'>
      <div className='max-w-6xl mx-auto bg-white border shadow-xl my-10 rounded-lg p-5'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='backdrop-blur-lg rounded-2xl shadow-sm border border-gray-300 p-8 mb-8 transform transition-transform duration-300'>
            <div className='flex justify-between items-center'>
              <img
                src='/assets/images/thc-logo.png'
                className='w-36'
                alt='Logo'
              />
            </div>

            <div className='text-2xl font-medium text-gray-700 mb-2'>
              <h1 className='text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                Holiday Voucher
              </h1>
              <span className='text-3xl'>🥳</span>
              <span className='text-orange-500'>Congratulations!</span>{' '}
              {voucher.data.customerName}
            </div>
            <div className='inline-block bg-gradient-to-r from-blue-200 to-purple-200 px-6 py-3 rounded-full border-dashed border-2 border-gray-400 '>
              <span className='text-gray-700 text-xl'>Gift Code: </span>
              <span className='font-mono font-extrabold text-2xl'>
                {voucher.data.voucherCode}
              </span>
            </div>
          </div>
        </div>

        {/* Voucher Details */}
        <div className='rounded-2xl shadow-xl p-8 mb-8'>
          <div className='space-y-4 text-gray-700'>
            <p>
              On participation in the presentation of{' '}
              <span className='font-semibold'>The Holidays Club</span>, this
              voucher is issued to:{' '}
              <span className='font-semibold'>{voucher.data.customerName}</span>{' '}
              on {formatDate(voucher.data.generatedDate)} is
              <span className='font-semibold'> valid for six months</span> from
              the date of issue ({formatDate(voucher.data.expiryDate)}).
            </p>
            <p>
              To avail this offer you must have at least three options of dates
              and destination in which the management has the right to offer you
              any one of the given destination/dates.
            </p>

            <p>
              This voucher entitles you to 3N/4D accommodation at our associate
              hotels.
            </p>

            <div className='space-y-4 text-gray-600'>
              <div className='flex items-center space-x-2 text-lg font-medium text-blue-600'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>Important Information</span>
              </div>
              <ul className='space-y-3'>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='w-5 h-5 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>
                    This holiday voucher is redeemable for 3N/4D accommodation
                    only in STD/Semi Deluxe room only at The Holidays Club
                    Hotels.
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='w-5 h-5 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>
                    This voucher can be used at associate Hotels & Resorts only.
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='w-5 h-5 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>
                    This voucher is only for 2 adults(Couple) and 2 kids (age:
                    below 12 Years).
                  </span>
                </li>
                <li className='flex items-center space-x-3 text-amber-600'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                  <span>
                    This voucher is not valid during peak season & public
                    holidays, as well as Diwali, Christmas, New Year,
                    Independence Day, Republic Day and long weekends.
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='w-5 h-5 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>
                    This voucher is not transferable & cannot be redeemed for
                    cash.
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='w-5 h-5 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span>
                    A prepaid administration fee of Rs.5000/- is mandatory to
                    pay in advance by CHIC/CNEFT/IMPS. For Neft/ Imps, a mail
                    will be sent for account details from{' '}
                    <a
                      href='mailto:info@theholidaysclubs.com'
                      className='text-blue-600 hover:underline'>
                      info@theholidaysclubs.com
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Destination Gallery */}
        <div className='rounded-2xl shadow-xl p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>
            Available Destinations
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {destinations.map((dest) => {
              const isSelected = voucher.data.currentChoice
                ? [
                    voucher.data.currentChoice.choice1.city,
                    voucher.data.currentChoice.choice2.city,
                    voucher.data.currentChoice.choice3.city,
                  ].includes(dest.name)
                : formData.choices.includes(dest.name);

              return (
                <div
                  key={dest.name}
                  className={`relative rounded-xl overflow-hidden ${
                    !voucher.data.currentChoice ? 'cursor-pointer' : ''
                  } transform transition-all duration-300 hover:scale-105 ${
                    isSelected ? 'ring-4 ring-blue-500' : ''
                  }`}
                  onClick={() =>
                    !voucher.data.currentChoice && handleImageClick(dest.name)
                  }>
                  {isSelected && (
                    <CheckCircleIcon className='absolute top-2 right-2 text-yellow-500 bg-gray-800 rounded-full' />
                  )}
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className='w-full h-48 object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end'>
                    <span className='text-white font-medium p-4'>
                      {dest.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Section */}
        {voucher.data.currentChoice ? (
          <div className='space-y-8'>
            <div className='grid md:grid-cols-3 gap-8'>
              {[
                {
                  choice: voucher.data.currentChoice.choice1,
                  label: 'Choice 1',
                },
                {
                  choice: voucher.data.currentChoice.choice2,
                  label: 'Choice 2',
                },
                {
                  choice: voucher.data.currentChoice.choice3,
                  label: 'Choice 3',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className='p-6 rounded-xl border border-gray-200 bg-gray-50'>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-semibold text-gray-800'>
                      {item.label}
                    </h3>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Selected Destination
                      </label>
                      <div className='p-3 bg-white rounded-lg border border-gray-200'>
                        {item.choice.city}
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Selected Date
                      </label>
                      <div className='p-3 bg-white rounded-lg border border-gray-200'>
                        {formatDate(item.choice.date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='text-center p-4 bg-blue-50 rounded-xl'>
              <p className='text-blue-800 font-medium'>
                Your choices have been submitted successfully
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='space-y-8'>
            <div className='grid md:grid-cols-3 gap-8'>
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className='space-y-4'>
                  <div className='p-6 rounded-xl border border-gray-200'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Choice {index + 1}
                    </label>
                    <Select
                      options={getSelectOptions(index)}
                      value={
                        formData.choices[index]
                          ? {
                              value: formData.choices[index],
                              label: formData.choices[index],
                            }
                          : null
                      }
                      onChange={(selected) => {
                        handleDestinationSelect(selected?.value || '', index);
                      }}
                      placeholder='Search destination...'
                      className='mb-4'
                      classNamePrefix='react-select'
                    />
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Date {index + 1}
                      </label>
                      <input
                        type='date'
                        className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        value={formData.dates[index]}
                        onChange={(e) => {
                          const newDates = [...formData.dates];
                          newDates[index] = e.target.value;
                          setFormData({ ...formData, dates: newDates });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1'>
              Submit Your Choices
            </button>
          </form>
        )}

        {/* Footer Note */}
        <div className='text-center rounded-2xl shadow-lg p-6 mt-8'>
          <p className='text-gray-600'>
            For booking kindly send the scanned copy of your voucher at{' '}
            <a
              href='mailto:booking@theholidaysclubs.com'
              className='text-blue-600 hover:text-blue-800 font-medium hover:underline'>
              booking@theholidaysclubs.com
            </a>{' '}
            along with three choices of destinations and dates providing at
            least 30-45 days of advance notice.
          </p>
        </div>
      </div>
    </div>
  );
}

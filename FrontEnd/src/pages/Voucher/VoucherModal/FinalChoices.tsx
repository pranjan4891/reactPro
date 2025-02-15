import React, { useState } from 'react';
import Select from 'react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Calendar, MapPin } from 'lucide-react';
import { finalUpdateChoice } from '../../../utils/http-requests';

interface Choice {
  city: string;
  date: string;
}

interface CurrentChoice {
  createdAt: string;
  choice1: Choice;
  choice2: Choice;
  choice3: Choice;
}

interface Voucher {
  _id: string;
  voucherCode: string;
  currentChoice: CurrentChoice;
}

interface FinalChoicesProps {
  voucher: Voucher;
}

const FinalChoices: React.FC<FinalChoicesProps> = ({ voucher }) => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const updateMutation = useMutation({
    mutationFn: (data: { city: string; date: string }) =>
      finalUpdateChoice(voucher._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['voucher', voucher._id],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedCity) return;

    updateMutation.mutate({
      city: selectedCity,
      date: new Date(selectedDate).toISOString(),
    });
  };

  const dateOptions = [
    {
      value: voucher.currentChoice.choice1.date,
      label: new Date(voucher.currentChoice.choice1.date).toLocaleDateString(
        'en-US',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      ),
    },
    {
      value: voucher.currentChoice.choice2.date,
      label: new Date(voucher.currentChoice.choice2.date).toLocaleDateString(
        'en-US',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      ),
    },
    {
      value: voucher.currentChoice.choice3.date,
      label: new Date(voucher.currentChoice.choice3.date).toLocaleDateString(
        'en-US',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      ),
    },
  ];

  const cityOptions = [
    {
      value: voucher.currentChoice.choice1.city,
      label: voucher.currentChoice.choice1.city,
    },
    {
      value: voucher.currentChoice.choice2.city,
      label: voucher.currentChoice.choice2.city,
    },
    {
      value: voucher.currentChoice.choice3.city,
      label: voucher.currentChoice.choice3.city,
    },
  ];

  const customStyles = {
    control: (base: any) => ({
      ...base,
      padding: '2px',
      borderColor: '#e2e8f0',
      '&:hover': {
        borderColor: '#cbd5e1',
      },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#3b82f6'
        : state.isFocused
        ? '#e2e8f0'
        : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '10px 12px',
    }),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-8 bg-white rounded-xl shadow-lg max-w-3xl mx-auto'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Final Travel Selection
        </h2>
        <p className='text-gray-600'>
          Voucher Code:{' '}
          <span className='font-semibold text-purple-600'>
            {voucher.voucherCode}
          </span>
        </p>
      </div>

      <div className='space-y-6'>
        <div>
          <label className='flex items-center text-gray-700 font-medium mb-2'>
            <Calendar className='w-5 h-5 mr-2 text-blue-500' />
            Select Final Date
          </label>
          <Select
            options={dateOptions}
            value={dateOptions.find((option) => option.value === selectedDate)}
            onChange={(option) => setSelectedDate(option?.value || '')}
            styles={customStyles}
            placeholder='Choose your travel date'
            isSearchable={false}
            className='react-select-container'
            classNamePrefix='react-select'
          />
        </div>

        <div>
          <label className='flex items-center text-gray-700 font-medium mb-2'>
            <MapPin className='w-5 h-5 mr-2 text-blue-500' />
            Select Final Destination
          </label>
          <Select
            options={cityOptions}
            value={cityOptions.find((option) => option.value === selectedCity)}
            onChange={(option) => setSelectedCity(option?.value || '')}
            styles={customStyles}
            placeholder='Choose your destination'
            isSearchable={false}
            className='react-select-container'
            classNamePrefix='react-select'
          />
        </div>
      </div>

      <div className='mt-8'>
        <button
          type='submit'
          disabled={updateMutation.isPending || !selectedDate || !selectedCity}
          className='w-full px-6 py-3 bg-green-500 text-white rounded-lg font-medium 
                   hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 
                   focus:ring-opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed
                   transition-colors duration-200 flex items-center justify-center'>
          {updateMutation.isPending ? (
            <>
              <Loader2 className='animate-spin -ml-1 mr-2 h-5 w-5' />
              Confirming Selection...
            </>
          ) : (
            'Confirm Final Selection'
          )}
        </button>
      </div>

      {updateMutation.isError && (
        <div className='mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start'>
          <div className='flex-1'>
            <p className='font-medium'>Update Failed</p>
            <p className='text-sm'>
              An error occurred while updating your final selection. Please try
              again.
            </p>
          </div>
        </div>
      )}

      {updateMutation.isSuccess && (
        <div className='mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start'>
          <div className='flex-1'>
            <p className='font-medium'>Success!</p>
            <p className='text-sm'>
              Your final travel selection has been confirmed.
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default FinalChoices;

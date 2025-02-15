import React, { useState } from 'react';
import Select from 'react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { clientUpdateChoice } from '../../../utils/http-requests';

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

interface ModifyChoicesProps {
  voucher: Voucher;
}

interface Destination {
  name: string;
  image: string;
}

const destinationData: Destination[] = [
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

const ModifyChoices: React.FC<ModifyChoicesProps> = ({ voucher }) => {
  const queryClient = useQueryClient();
  const [dates, setDates] = useState({
    date1: voucher.currentChoice.choice1.date,
    date2: voucher.currentChoice.choice2.date,
    date3: voucher.currentChoice.choice3.date,
  });
  const [selectedDestinations, setSelectedDestinations] = useState({
    destination1: voucher.currentChoice.choice1.city,
    destination2: voucher.currentChoice.choice2.city,
    destination3: voucher.currentChoice.choice3.city,
  });

  const updateMutation = useMutation({
    mutationFn: (data: { choices: string[]; dates: string[] }) =>
      clientUpdateChoice(voucher._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voucher', voucher._id] });
    },
  });

  const formatDateForInput = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      choices: [
        selectedDestinations.destination1,
        selectedDestinations.destination2,
        selectedDestinations.destination3,
      ],
      dates: [dates.date1, dates.date2, dates.date3],
    });
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  const CustomOption = ({ innerProps, label, data }: any) => (
    <div
      {...innerProps}
      className='flex items-center p-2 cursor-pointer hover:bg-gray-100'>
      <img
        src={data.image}
        alt={label}
        className='w-8 h-8 rounded-full object-cover mr-2'
      />
      <span>{label}</span>
    </div>
  );

  const CustomSingleValue = ({ children, data }: any) => (
    <div className='flex items-center'>
      <img
        src={data.image}
        alt={children}
        className='w-6 h-6 rounded-full object-cover mr-2'
      />
      <span>{children}</span>
    </div>
  );

  const destinationOptions = destinationData.map((dest) => ({
    value: dest.name,
    label: dest.name,
    image: dest.image,
  }));

  const getDefaultValue = (city: string) => {
    return destinationOptions.find((option) => option.value === city);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-6 bg-white rounded-lg shadow-lg'>
      <p className='text-sm text-gray-600 mb-4'>
        Modify travel dates and destinations for Voucher{' '}
        <span className='text-lg font-semibold ml-1 text-purple-500'>
          {voucher.voucherCode}
        </span>
      </p>

      <div className='grid grid-cols-3 gap-4 mb-6'>
        {[1, 2, 3].map((index) => (
          <React.Fragment key={index}>
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                Date {index}*
              </label>
              <input
                type='date'
                className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
                value={formatDateForInput(
                  dates[`date${index}` as keyof typeof dates]
                )}
                onChange={(e) =>
                  setDates((prev) => ({
                    ...prev,
                    [`date${index}`]: e.target.value,
                  }))
                }
                required
              />
            </div>
          </React.Fragment>
        ))}
        {[1, 2, 3].map((index) => (
          <div key={`dest${index}`}>
            <label className='block font-medium mb-2 text-gray-700'>
              Destination {index}*
            </label>
            <Select
              options={destinationOptions}
              value={getDefaultValue(
                selectedDestinations[
                  `destination${index}` as keyof typeof selectedDestinations
                ]
              )}
              onChange={(option) =>
                setSelectedDestinations((prev) => ({
                  ...prev,
                  [`destination${index}`]: option?.value || '',
                }))
              }
              styles={customStyles}
              components={{
                Option: CustomOption,
                SingleValue: CustomSingleValue,
              }}
              className='react-select-container'
              classNamePrefix='react-select'
              required
            />
          </div>
        ))}
      </div>

      <div className='flex justify-end mt-6'>
        <button
          type='submit'
          disabled={updateMutation.isPending}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300 flex items-center'>
          {updateMutation.isPending ? (
            <>
              <Loader2 className='animate-spin -ml-1 mr-2 h-4 w-4' />
              Updating...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {updateMutation.isError && (
        <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-md'>
          An error occurred while updating your choices. Please try again.
        </div>
      )}

      {updateMutation.isSuccess && (
        <div className='mt-4 p-3 bg-green-100 text-green-700 rounded-md'>
          Your choices have been updated successfully!
        </div>
      )}
    </form>
  );
};

export default ModifyChoices;

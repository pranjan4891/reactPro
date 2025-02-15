import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchAfformById } from '../../utils/http-requests';
// import Loader from "../../components/common/Loader";
import FetchError from '../../components/common/FetchError';
import './AfFormDetails.css';
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Gift,
  Users,
  Image,
} from 'lucide-react';

const AfFormDetails: FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the ID from the URL

  const {
    data: afform,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['afform', id],
    queryFn: () => fetchAfformById(id as string),
  });

  console.log('AfForm Details');

  //   if (isLoading) return <Loader />;
  if (isError)
    return (
      <FetchError
        message='Failed to fetch AF Form Details'
        onRefresh={refetch}
      />
    );

  if (!afform) return <p>No AfForm data found.</p>;

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className='bg-gray-800 px-6 py-4'>
            <h1 className='text-2xl font-bold text-white'>AF Form Details</h1>
          </div>

          <div className='p-6 space-y-8'>
            {/* Basic Information */}
            <section className='space-y-4'>
              <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
                Basic Information
              </h2>
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex-grow space-y-3'>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium text-gray-700'>
                      Temp A.F. No:
                    </span>
                    <span className='text-gray-600'>{afform.tempAfNo}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>Dated:</span>
                    <span className='text-gray-600'>{afform.dated}</span>
                  </div>
                </div>
                {afform.picture && (
                  <div className='flex-shrink-0'>
                    <div className='relative w-32 h-32'>
                      <Image className='absolute top-2 right-2 w-5 h-5 text-blue-600 z-10' />
                      <img
                        src={`http://localhost:8000/${afform.picture}`}
                        alt='Profile'
                        className='w-full h-full object-cover rounded-lg shadow-md'
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Applicant Information */}
            <section className='space-y-4'>
              <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
                Applicant Information
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Users className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>
                      Full Name:
                    </span>
                    <span className='text-gray-600'>
                      {`${afform.applicantTitle} ${afform.applicantFirstName} ${afform.applicantMiddleName} ${afform.applicantLastName}`.trim()}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>
                      Date of Birth:
                    </span>
                    <span className='text-gray-600'>
                      {afform.applicantDateOfBirth}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Gift className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>
                      Marriage Anniversary:
                    </span>
                    <span className='text-gray-600'>
                      {afform.applicantMarriageAnniversary || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className='space-y-4'>
              <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
                Contact Information
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>Address:</span>
                    <span className='text-gray-600'>
                      {afform.applicantCorrespondenceAddress}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium text-gray-700'>Pincode:</span>
                    <span className='text-gray-600'>
                      {afform.applicantPincode}
                    </span>
                  </div>
                </div>
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Mail className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>Email:</span>
                    <span className='text-gray-600'>
                      {afform.applicantEmail}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>
                      Mobile (01):
                    </span>
                    <span className='text-gray-600'>
                      {afform.applicantMobile01}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>
                      Mobile (02):
                    </span>
                    <span className='text-gray-600'>
                      {afform.applicantMobile02 || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Special Offer */}
            <section className='space-y-4'>
              <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
                Special Offer
              </h2>
              <div className='bg-blue-50 p-4 rounded-lg'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='flex items-center gap-2'>
                    <Gift className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>Details:</span>
                    <span className='text-gray-600'>
                      {afform.specialOfferDetails}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium text-gray-700'>Worth:</span>
                    <span className='text-gray-600'>
                      {afform.specialOfferWorth}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-5 h-5 text-blue-600' />
                    <span className='font-medium text-gray-700'>Expires:</span>
                    <span className='text-gray-600'>
                      {afform.specialOfferMonthOfExpiration}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Manager and Consultant */}
            <section className='space-y-4'>
              <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
                Manager and Consultant
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <Users className='w-5 h-5 text-blue-600' />
                  <span className='font-medium text-gray-700'>Manager:</span>
                  <span className='text-gray-600'>{afform.manager}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='w-5 h-5 text-blue-600' />
                  <span className='font-medium text-gray-700'>Consultant:</span>
                  <span className='text-gray-600'>{afform.consultant}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfFormDetails;

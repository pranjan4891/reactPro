import React, { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  validateYupSchema,
} from 'formik'
import * as Yup from 'yup'

import { useDispatch } from 'react-redux'
import { clearValidationErrors } from '../../store/slices/serverValidationError'
import ValidationErrorList from '../../components/common/validationErrorList'
import { VenueIface } from '../../types/typesVenue'
import { apiEndpoints } from '../../utils/constants/apiEndpoints'
import { LocationIface } from '../../types/typesLocation'
import { APIResponseIface } from "../../types/api-response";
import { getLocations } from '../../utils/http-requests'
import { Status } from '../../utils/status'



interface ModalProps {
  isOpen: boolean
  onClose: () => void
  mutatePending: boolean
  error: string | null // Pass the error to the modal
  children: React.ReactNode
  addVenue: (venue: VenueIface) => void
  editData?: VenueIface | null // Receive editData as a prop,
  validationError?: Record<string, string[]> // Validation errors object from the server
}

// const UpdateModal = ({ isOpen, onClose, children }: ModalProps) => {
const UpdateModal: React.FC<ModalProps> = ({
  isOpen,
  mutatePending,
  onClose,
  children,
  addVenue,
  editData,
  error,
}) => {
  if (!isOpen) return null

  // Use useQuery to fetch location data dynamically
  const { data: locationsData, refetch,isLoading, isError, isFetching} = useQuery<APIResponseIface, Error>({
    queryKey: ['location'],
    queryFn: getLocations,
  });

  // console.log(locationsData);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    venueName: Yup.string().required('Venue Name is required'),
    location: Yup.string().required('Location is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date().required('End Date is required'),
    address: Yup.string().required('Address is required'),
  })

  // Initial form values
  const initialValues: VenueIface = {
    venueName: '',
    location: '',
    startDate: '',
    endDate: '',
    address: '',
    status: Status.INACTIVE,
  }

  const dispatch = useDispatch()

  // Handle form submission
  const handleSubmit = async (
    values: VenueIface,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    dispatch(clearValidationErrors())
    console.log('Submission Data with Return Address:', values)
    addVenue(values)
    setTimeout(() => {
      setSubmitting(false)
    }, 500)
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md mx-auto flex flex-col relative'>
        {/* Header */}
        {mutatePending && (
          <div className='absolute h-full bg-white opacity-90 w-full top-0 pt-10 rounded-lg justify-center z-50'>
            <div className='flex w-full gap-4 justify-center h-full items-center pt-5'>
              <div>
                <span className='loading loading-spinner text-primary loading-md'></span>
              </div>
              <div>
                <h5 className='text-lg font-medium'>
                  Processing, Please wait...
                </h5>
              </div>
            </div>
          </div>
        )}
        <div className='text-gray-900 px-4 py-3 rounded-t-lg w-full border-b'>
          <div className='text-gray-900 rounded-t-lg w-full flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Add New Venue</h2>
            <button
              onClick={onClose}
              className='text-white bg-red-500 hover:bg-red-600 rounded-sm hover:text-white px-3 py-1'
            >
              &#x2715; {/* Close Icon */}
            </button>
          </div>
          <div>
            {error && (
              <div
                role='alert'
                className='rounded border-s-4 border-red-500 bg-red-50 px-4 pt-2 mt-1'
              >
                <div className='flex items-center gap-2 text-red-800'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
                      clipRule='evenodd'
                    />
                  </svg>

                  <strong className='block font-medium'>
                    {' '}
                    Something went wrong{' '}
                  </strong>
                </div>
                <p className='text-sm text-red-700'>
                  {error} {/* Display the error message */}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="p-4 overflow-y-auto" style={{ maxHeight: '75vh' }}>
              {/* Display validation errors */}
              <div className="border mt-3 border-gray-400 pt-6 pb-4 relative rounded-md">
                <div className="absolute ml-3 px-1 -top-3 bg-white font-medium text-purple-600">
                  <h3>Details</h3>
                </div>

                <div className="grid px-4 gap-4">
                  {/* Location Name Field */}
                  {/* Venue Name */}
                  <div >
                    <label htmlFor="venueName"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.venueName && touched.venueName ? 'border-red-500' : ''
                        }`}>

                      <Field
                        type="text"
                        id="venueName"
                        name="venueName"
                        className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter venue name"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Venue Name*</span>

                    </label>
                    <ErrorMessage name="venueName" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Location (Dropdown) */}
                  {/* <div >
                    <label htmlFor="location"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.location && touched.location ? 'border-red-500' : ''
                        }`}>
                     
                    <Field
                      as="select"
                      id="location"
                      name="location"
                      className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      >
                      <option value="">Select Location</option>
                      <option value="location1">Location 1</option>
                      <option value="location2">Location 2</option>
                      <option value="location3">Location 3</option>
                    </Field>
                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"> Location*</span>
                      </label>
                    <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                  </div> */}

                  <div>
                    <label
                      htmlFor="location"
                      className="relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <Field
                        as="select"
                        id="location"
                        name="location"
                        className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      >
                        <option value="">Select Location</option>
                        {locationsData?.data.map((location:any) => (
                          <option key={location._id} value={location._id}>
                            {location.name}
                          </option>
                        ))}
                      </Field>
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Location*
                      </span>
                    </label>
                    <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Start Date */}
                  <div >
                    <label htmlFor="startDate"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.startDate && touched.startDate ? 'border-red-500' : ''
                        }`}>

                      <Field
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"> Start Date*</span>

                    </label>
                    <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* End Date */}
                  <div >
                    <label htmlFor="endDate"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.endDate && touched.endDate ? 'border-red-500' : ''
                        }`}>

                      <Field
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"> End Date*</span>
                    </label>
                    <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Address */}
                  <div >
                    <label htmlFor="address"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.address && touched.address ? 'border-red-500' : ''
                        }`}>

                      <Field
                        type="text"
                        id="address"
                        name="address"
                        className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter address"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"> Address</span>
                    </label>
                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Is Active Checkbox */}
                  <div className="mb-4 flex items-center">
                    <Field type="checkbox" id="isActive" name="status" className="mr-2" />
                    <label htmlFor="isActive" className="text-gray-600 font-medium">
                      Is Active?
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex justify-end">
                <button type="submit" className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600">
                  Add Venue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default React.memo(UpdateModal)

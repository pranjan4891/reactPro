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
import {  getLocations, getVenue } from '../../utils/http-requests'
import { APIResponseIface } from '../../types/api-response'
import { Status } from '../../utils/status'
import { GuestRegistrationIface } from '../../types/GuestsRegistration'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  mutatePending: boolean
  error: string | null // Pass the error to the modal
  children: React.ReactNode
  guestRegisteration: (venue: GuestRegistrationIface) => void
  editData?: GuestRegistrationIface | null // Receive editData as a prop,
  validationError?: Record<string, string[]> // Validation errors object from the server
}

// const UpdateModal = ({ isOpen, onClose, children }: ModalProps) => {
const UpdateModal: React.FC<ModalProps> = ({
  isOpen,
  mutatePending,
  onClose,
  children,
  guestRegisteration,
  editData,
  error,
}) => {
  if (!isOpen) return null

  const { data: locationsData, isLoading, error: any } = useQuery<APIResponseIface, Error>({
    queryKey: ['location'],
    queryFn: getLocations,
  });

  const { data:venueData,  isError, refetch, isFetching, isPending } = useQuery<APIResponseIface, Error>({
    queryKey: ['venue'],
    queryFn: getVenue,
  });

  
  // Validation schema using Yup
  const validationSchema = Yup.object({
    userName: Yup.string().required('User Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please retype the password'),
    permanentAddress: Yup.string().required('Permanent Address is required'),
    department: Yup.string().required('Department is required'),
    role: Yup.string().required('Role is required'),
    location: Yup.string().required('Location is required'),
    venue: Yup.string().required('Venue is required'),
    // isActive: Yup.boolean(),
    employeeImage: Yup.mixed().nullable(), // Optional file field
    kycImage: Yup.mixed().nullable(),
  })

  // Initial form values
  const initialValues: GuestRegistrationIface = {
    firstName: '',
    email: '',
    middleName: '',
    lastName: '',
    phone: '',
    location: '',
    date: '',
    venue: '',
    manager: '',
    consultant: '',
  }

  const dispatch = useDispatch()

  // Handle form submission
  const handleSubmit = async (
    values: GuestRegistrationIface,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    dispatch(clearValidationErrors())
    console.log('Submission Data with Return Address:', values)
    guestRegisteration(values)
    setTimeout(() => {
      setSubmitting(false)
    }, 500)
  }

  // return (
  //   <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
  //     <div className='bg-white rounded-lg shadow-lg w-full max-w-md mx-auto flex flex-col relative'>
  //       {/* Header */}
  //       {mutatePending && (
  //         <div className='absolute h-full bg-white opacity-90 w-full top-0 pt-10 rounded-lg justify-center z-50'>
  //           <div className='flex w-full gap-4 justify-center h-full items-center pt-5'>
  //             <div>
  //               <span className='loading loading-spinner text-primary loading-md'></span>
  //             </div>
  //             <div>
  //               <h5 className='text-lg font-medium'>
  //                 Processing, Please wait...
  //               </h5>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //       <div className='text-gray-900 px-4 py-3 rounded-t-lg w-full border-b'>
  //         <div className='text-gray-900 rounded-t-lg w-full flex justify-between items-center'>
  //           <h2 className='text-lg font-semibold'>Add New Venue</h2>
  //           <button
  //             onClick={onClose}
  //             className='text-white bg-red-500 hover:bg-red-600 rounded-sm hover:text-white px-3 py-1'
  //           >
  //             &#x2715; {/* Close Icon */}
  //           </button>
  //         </div>
  //         <div>
  //           {error && (
  //             <div
  //               role='alert'
  //               className='rounded border-s-4 border-red-500 bg-red-50 px-4 pt-2 mt-1'
  //             >
  //               <div className='flex items-center gap-2 text-red-800'>
  //                 <svg
  //                   xmlns='http://www.w3.org/2000/svg'
  //                   viewBox='0 0 24 24'
  //                   fill='currentColor'
  //                   className='size-5'
  //                 >
  //                   <path
  //                     fillRule='evenodd'
  //                     d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
  //                     clipRule='evenodd'
  //                   />
  //                 </svg>

  //                 <strong className='block font-medium'>
  //                   {' '}
  //                   Something went wrong{' '}
  //                 </strong>
  //               </div>
  //               <p className='text-sm text-red-700'>
  //                 {error} {/* Display the error message */}
  //               </p>
  //             </div>
  //           )}
  //         </div>
  //       </div>

  //       {/* Scrollable Body */}
  //       <Formik
  //         initialValues={initialValues}
  //         validationSchema={validationSchema}
  //         onSubmit={handleSubmit}
  //       >
  //         {({ errors, touched ,setFieldValue}) => (
  //           <Form className="p-4 overflow-y-auto" style={{ maxHeight: '75vh' }}>
  //             {/* Display validation errors */}
  //             <div className="border mt-3 border-gray-400 pt-6 pb-4 relative rounded-md">
  //               <div className="absolute ml-3 px-1 -top-3 bg-white font-medium text-purple-600">
  //                 <h3>Details</h3>
  //               </div>

  //               <div className="grid px-4 gap-4">
  //                 <div >
  //                   <label htmlFor="userName"
  //                     className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.firstName && touched.firstName ? 'border-red-500' : ''
  //                       }`}
  //                   >

  //                     <Field
  //                       type="text"
  //                       id="userName"
  //                       name="userName"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                       placeholder="Enter venue name"
  //                     />
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">User Name*</span>
  //                   </label>
  //                   <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
  //                 </div>
  //                 <div >
  //                   <label htmlFor="email"
  //                     className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.email && touched.email ? 'border-red-500' : ''
  //                       }`}>

  //                     <Field
  //                       type="text"
  //                       id="email"
  //                       name="email"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                       placeholder="Enter Email"
  //                     />
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Email*</span>
  //                   </label>
  //                   <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
  //                 </div>
  //                 <div >
  //                   <label htmlFor="phoneNumber"
  //                     className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.email && touched.email ? 'border-red-500' : ''
  //                       }`}>

  //                     <Field
  //                       type="text"
  //                       id="phoneNumber"
  //                       name="phoneNumber"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                       placeholder="Enter venue name"
  //                     />
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Phone Number*</span>
  //                   </label>
  //                   <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
  //                 </div>
  //                 <div >
  //                   <label htmlFor="alternatePhoneNumber"
  //                     className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.phone && touched.phone ? 'border-red-500' : ''
  //                       }`}>


  //                     <Field
  //                       type="text"
  //                       id="alternatePhoneNumber"
  //                       name="alternatePhoneNumber"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                       placeholder="Enter venue name"
  //                     />
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Alternate Phone Number</span>
  //                   </label>
  //                 </div>
  //                 {/* <div >
  //                   <label htmlFor="password"
  //                     className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.password && touched.password ? 'border-red-500' : ''
  //                       }`}>
  //                     <Field
  //                       type="text"
  //                       id="password"
  //                       name="password"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                       placeholder="Enter venue name"
  //                     />
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"> Password*</span>
  //                   </label>
  //                   <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
  //                 </div> */}
  //                 {/* <div >
  //                   <label htmlFor="confirmPassword"
  //                     className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''
  //                       }`}>
  //                     <Field
  //                       type="text"
  //                       id="confirmPassword"
  //                       name="confirmPassword"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                       placeholder="Enter venue name"
  //                     />
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Retype the Password*</span>
  //                   </label>
  //                 </div> */}

  //                 {/* <div >
  //                   <label htmlFor="permanentAddress"
  //                     className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.permanentAddress && touched.permanentAddress ? 'border-red-500' : ''
  //                       }`}>

  //                     <Field
  //                       type="text"
  //                       id="permanentAddress"
  //                       name="permanentAddress"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                       placeholder="Enter venue name"
  //                     />
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">  Permanent Address*</span>
  //                   </label>
  //                   <ErrorMessage name="permanentAddress" component="div" className="text-red-500 text-sm" />
  //                 </div> */}
  //                 <div >
  //                   <label htmlFor="alternateAddress" className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.alternateAddress && touched.alternateAddress ? 'border-red-500' : ''
  //                     }`}>

  //                     <Field
  //                       type="text"
  //                       id="alternateAddress"
  //                       name="alternateAddress"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                       placeholder="Enter venue name"
  //                     />
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Alternate Address*</span>
  //                   </label>
  //                 </div>

  //                 <div >
  //                   <label htmlFor="department" className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.department && touched.department ? 'border-red-500' : ''
  //                     }`}>
                     
  //                     <Field
  //                       as="select"
  //                       id="department"
  //                       name="department"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"

  //                     >
  //                       <option value="">Select Department</option>
  //                       <option value="HR">HR</option>
  //                       <option value="IT">IT</option>
  //                       {/* Add more options as needed */}
  //                     </Field>
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"> Select Department*</span>
  //                   </label>
  //                   <ErrorMessage name="department" component="div" className="text-red-500 text-sm" />
  //                 </div>
  //                 <div >
  //                   <label htmlFor="role" className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.role && touched.role ? 'border-red-500' : ''
  //                     }`}>
                      
  //                     <Field
  //                       as="select"
  //                       id="role"
  //                       name="role"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                     >
  //                       <option value="">Select Role</option>
  //                       <option value="Manager">Manager</option>
  //                       <option value="Employee">Employee</option>
  //                       {/* Add more options as needed */}
  //                     </Field>
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Role*</span>
  //                   </label>
  //                   <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
  //                 </div>
  //                 <div>
  //                   <label
  //                     htmlFor="location"
  //                     className="relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  //                   >
  //                     <Field
  //                       as="select"
  //                       id="location"
  //                       name="location"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                     >
  //                       <option value="">Select Location</option>
  //                       {locationsData?.data.map((location:any) => (
  //                         <option key={location._id} value={location._id}>
  //                           {location.name}
  //                         </option>
  //                       ))}
  //                     </Field>
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
  //                       Location*
  //                     </span>
  //                   </label>
  //                   <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
  //                 </div>
             

  //                 <div >
  //                   <label htmlFor="venue"
  //                     className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.venue && touched.venue ? 'border-red-500' : ''
  //                       }`}
  //                   >

  //                     <Field
  //                       as="select"
  //                       id="venue"
  //                       name="venue"
  //                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
  //                     >
  //                       <option value="">Select Venue</option>
  //                       {venueData?.data.map((venue:any) => (
  //                         <option key={venue._id} value={venue._id}>
  //                           {venue?.venueName}
  //                         </option>
  //                       ))}
  //                       {/* Add more options as needed */}
  //                     </Field>
  //                     <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
  //                       Select Venue*
  //                     </span>
  //                   </label>
  //                   <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
  //                 </div>
            

  //                 <div className="flex items-center mt-4">
  //                   <Field
  //                     type="checkbox"
  //                     id="isActive"
  //                     name="isActive"
  //                     className="mr-2"
  //                   />
  //                   <label htmlFor="isActive" className="font-medium text-gray-600">
  //                     Is Active?
  //                   </label>
  //                 </div>


  //               </div>
  //             </div>

  //             {/* Submit Button */}
  //             <div className="mt-4 flex justify-end">
  //               <button type="submit" className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600">
  //                 Add Venue
  //               </button>
  //             </div>
  //           </Form>
  //         )}
  //       </Formik>
  //     </div>
  //   </div>
  // )
}

export default React.memo(UpdateModal)

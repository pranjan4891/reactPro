import React, { useEffect, useState } from 'react'
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
import { EmployeesIface } from '../../types/typesEmployees'
import {  getLocations, getVenue, getEmployees } from '../../utils/http-requests'
import { APIResponseIface } from '../../types/api-response'
import { Status } from '../../utils/status'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  mutatePending: boolean
  error: string | null // Pass the error to the modal
  children: React.ReactNode
  addEmployee: (venue: EmployeesIface) => void
  editData?: EmployeesIface | null // Receive editData as a prop,
  validationError?: Record<string, string[]> // Validation errors object from the server
}

// const UpdateModal = ({ isOpen, onClose, children }: ModalProps) => {
const UpdateModal: React.FC<ModalProps> = ({
  isOpen,
  mutatePending,
  onClose,
  children,
  addEmployee,
  editData,
  error,
}) => {
  if (!isOpen) return null

  const { data: locationsData, isLoading, error: any } = useQuery<APIResponseIface, Error>({
    queryKey: ['location'],
    queryFn: getLocations,
  });
  
  const { data: employeesData, isLoading: employeeLoading, error: employeeError } = useQuery<APIResponseIface, Error>({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  // if (employeeLoading) {
  //   return <div>Loading...</div>;
  // }
  
  // if (employeeError) {
  //   return <div>Error: {employeeError.message}</div>;
  // }
  
// Ensure that employeeData.data is an array before calling filter
const managerEmployees = Array.isArray(employeesData?.data)
  ? employeesData?.data.filter(employees => employees.role === 'Manager')
  : []; // Return an empty array if employeeData.data is not an array
  
//  console.log(managerEmployees);
// Ensure that employeeData.data is an array before calling filter
const venueManagerEmployees = Array.isArray(employeesData?.data)
  ? employeesData?.data.filter(employees => employees.role === 'VENUE_MANAGER')
  : []; // Return an empty array if employeeData.data is not an array
  
//  console.log(venueManagerEmployees);
 
  

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
  const initialValues: EmployeesIface = {
    userName: '',
    email: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    password: '',
    confirmPassword: '',
    permanentAddress: '',
    alternateAddress: '',
    department: '',
    role: '',
    location: '',
    venue: '',
    isActive: Status.INACTIVE,
    employeeImage: null,
    kycImage: null,
  }

  const dispatch = useDispatch()

  // Handle form submission
  const handleSubmit = async (
    values: EmployeesIface,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    dispatch(clearValidationErrors())
    console.log('Submission Data with Return Address:', values)
    addEmployee(values)
    setTimeout(() => {
      setSubmitting(false)
    }, 500)
  }

  
  const [departement, setDepartment] = useState('') 
  const [role, setRole] = useState('') 
  // console.log(departement)

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
            <h2 className='text-lg font-semibold'>Add New Employee</h2>
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
          {({ errors, touched ,setFieldValue}) => (
            <Form className="p-4 overflow-y-auto" style={{ maxHeight: '75vh' }}>
               <div className=''>
                {/* <h3 className="font-bold text-lg">Validation Errors:</h3> */}
                <ValidationErrorList />
              </div>
              <div className="border mt-3 border-gray-400 pt-6 pb-4 relative rounded-md">
                <div className="absolute ml-3 px-1 -top-3 bg-white font-medium text-purple-600">
                  <h3>Details</h3>
                </div>

                <div className="grid px-4 gap-4">
                  <div >
                    <label htmlFor="userName"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.userName && touched.userName ? 'border-red-500' : ''
                        }`}
                    >

                      <Field
                        type="text"
                        id="userName"
                        name="userName"
                        className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0 input-text-color"
                        placeholder="Enter venue name"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">User Name*</span>
                    </label>
                    <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div >
                    <label htmlFor="email"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.email && touched.email ? 'border-red-500' : ''
                        }`}>

                      <Field
                        type="text"
                        id="email"
                        name="email"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter Email"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Email*</span>
                    </label>
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div >
                    <label htmlFor="phoneNumber"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.email && touched.email ? 'border-red-500' : ''
                        }`}>

                      <Field
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter venue name"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Phone Number*</span>
                    </label>
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div >
                    <label htmlFor="alternatePhoneNumber"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : ''
                        }`}>


                      <Field
                        type="text"
                        id="alternatePhoneNumber"
                        name="alternatePhoneNumber"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter venue name"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Alternate Phone Number</span>
                    </label>
                  </div>
                  <div >
                    <label htmlFor="password"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.password && touched.password ? 'border-red-500' : ''
                        }`}>
                      <Field
                        type="text"
                        id="password"
                        name="password"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter venue name"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"> Password*</span>
                    </label>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div >
                    <label htmlFor="confirmPassword"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''
                        }`}>
                      <Field
                        type="text"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter venue name"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Retype the Password*</span>
                    </label>
                  </div>

                  <div >
                    <label htmlFor="permanentAddress"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.permanentAddress && touched.permanentAddress ? 'border-red-500' : ''
                        }`}>

                      <Field
                        type="text"
                        id="permanentAddress"
                        name="permanentAddress"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter venue name"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">  Permanent Address*</span>
                    </label>
                    <ErrorMessage name="permanentAddress" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div >
                    <label htmlFor="alternateAddress" className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.alternateAddress && touched.alternateAddress ? 'border-red-500' : ''
                      }`}>

                      <Field
                        type="text"
                        id="alternateAddress"
                        name="alternateAddress"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter venue name"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Alternate Address*</span>
                    </label>
                  </div>

                  <div >
                    <label htmlFor="department" className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.department && touched.department ? 'border-red-500' : ''
                      }`}>
                     
                      <Field
                        as="select"
                        id="department"
                        name="department"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const selectedValue = e.target.value;
                          console.log('Selected Department:', selectedValue);
                          setFieldValue('department', selectedValue); // Update Formik value
                          setDepartment(selectedValue); // Update Formik value
                        }}

                      >
                        <option value="">Select Department</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="SALES">Sales</option>
                        <option value="Accounts">Accounts</option>
                        <option value="Welcone Call">Welcone Call</option>
                        <option value="Backoffice">Backoffice</option>
                        {/* Add more options as needed */}
                      </Field>
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"> Select Department*</span>
                    </label>
                    <ErrorMessage name="department" component="div" className="text-red-500 text-sm" />
                  </div>
                  {departement === "SALES" && (
                  <>
                  
                  <div >
                    <label htmlFor="role" className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.role && touched.role ? 'border-red-500' : ''
                      }`}>
                      
                      <Field
                        as="select"
                        id="role"
                        name="role"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const selectedRole = e.target.value;
                          // console.log('Selected Department:', selectedRole);
                          setFieldValue('role', selectedRole); // Update Formik value
                          setRole(selectedRole); // Update Formik value
                        }}
                      >
                        <option value="">Select Role</option>
                        <option value="Manager">Manager</option>
                        {/* <option value="Welcome Call">Welcome Call</option> */}
                        {/* <option value="Sales">Sales</option> */}
                        <option value="VENUE_MANAGER">Venue Manager</option>
                        <option value="Consultant">Consultant</option>
                        {/* <option value="Employee">Employee</option> */}
                        {/* Add more options as needed */}
                      </Field>
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Role*</span>
                    </label>
                    <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                  </div>
                  {
                    (role === "VENUE_MANAGER" || role === "Consultant") &&(
                      <div>
                      <label
                        htmlFor="reportingTo"
                        className="relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                      >
                        <Field
                          as="select"
                          id="reportingTo"
                          name="reportingTo"
                          className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        >
                          <option value="">Reporting To</option>

                          {role === "VENUE_MANAGER" && managerEmployees?.map((employees: any) => (
                              <option key={employees?._id} value={employees?._id}>
                                {employees?.userName}
                              </option>
                            ))}

                          {role === "Consultant" && venueManagerEmployees?.map((employees: any) => (
                            <option key={employees?._id} value={employees?._id}>
                              {employees?.userName}
                            </option>
                          ))}
                        </Field>
                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Reporting To*
                        </span>
                      </label>
                      <ErrorMessage name="reportingTo" component="div" className="text-red-500 text-sm" />
                  </div>
                    )
                  }

                  <div>
                    <label
                      htmlFor="location"
                      className="relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <Field
                        as="select"
                        id="location"
                        name="location"
                        className="input-text-color peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
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

                  <div >
                    <label htmlFor="venue"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.venue && touched.venue ? 'border-red-500' : ''
                        }`}
                    >

                      <Field
                        as="select"
                        id="venue"
                        name="venue"
                        className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      >
                        <option value="">Select Venue</option>
                        {venueData?.data.map((venue:any) => (
                          <option key={venue._id} value={venue._id}>
                            {venue?.venueName}
                          </option>
                        ))}
                        {/* Add more options as needed */}
                      </Field>
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Select Venue*
                      </span>
                    </label>
                    <ErrorMessage name="venue" component="div" className="text-red-500 text-sm" />
                  </div>
                  </>)}
                  {/* <div >
                    <label htmlFor="employeeImage"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.employeeImage && touched.employeeImage ? 'border-red-500' : ''
                        }`}
                    >

                      <Field
                        name="employeeImage"
                        type="file"
                        className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      onChange={(event:any) => setFieldValue("employeeImage", event.target.files[0])}
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Upload Employee Image*
                      </span>
                    </label>
                    <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div >
                    <label htmlFor="kycImage"
                      className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${errors.kycImage && touched.kycImage ? 'border-red-500' : ''
                        }`}
                    >

                      <Field
                        name="kycImage"
                        type="file"
                       className="peer w-full border-none bg-transparent placeholder-transparent autofill:bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      onChange={(event:any) => setFieldValue("employeeImage", event.target.files[0])}
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Upload KYC Image*
                      </span>
                    </label>
                    <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                  </div> */}

                  <div className="flex items-center mt-4">
                    <Field
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      className="mr-2"
                    />
                    <label htmlFor="isActive" className="font-medium text-gray-600">
                      Is Active?
                    </label>
                  </div>


                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex justify-end">
                <button type="submit" className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600">
                  Add Employee
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

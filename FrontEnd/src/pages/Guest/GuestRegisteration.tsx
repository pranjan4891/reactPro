import React, { useState } from 'react';
import axios from 'axios';
import { GuestRegistrationIface } from '../../types/GuestsRegistration';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import {
  createGuest,
  getLocations,
  getVenue,
  getEmployees,
} from '../../utils/http-requests';
import { APIResponseIface } from '../../types/api-response';
import {
  Formik,
  Form,
  FieldValidator,
  Field,
  FieldArray,
  ErrorMessage,
} from 'formik';
import { useNavigate } from 'react-router-dom';

const GuestRegistration = () => {
  const [venueSuggestions, setVenueSuggestions] = useState<string[]>([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [locationName, setLocationName] = useState('');
  const navigate = useNavigate();

  const initialFormData: GuestRegistrationIface = {
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    date: '',
    venue: '',
    manager: '', // Manager select field
    consultant: '',
    afFormGenerated: false,
  };
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.string().required('Date is required'),
    venue: Yup.string().required('Venue is required'),
    manager: Yup.string().required('Please select a manager'), // Manager validation
    consultant: Yup.string().required('Consultant is required'),
  });

  const createProcess = useMutation({
    mutationFn: (data: GuestRegistrationIface) => {
      return createGuest(data); // API call to add the gest data
    },

    onSuccess: () => {
      alert('success');
    },

    onError: (error: any) => {
      let errorData = error.response.data;

      if (errorData?.remarks == 'VALIDATION_FAILED') {
        alert('error 1');
      } else if (errorData?.remarks == 'SERVER_ERROR') {
        alert('Something went Wrong, Please Retry!'); // Set error message
      } else if (errorData.remarks == 'UNAUTHORIZED') {
        alert('Sesion Expired pls do login again!'); // Set error message
      } else {
        alert(error.message || 'An error occurred while adding the location.'); // Set error message
      }
    },
  });

  const {
    data: employeesData,
    isLoading: employeeLoading,
    error: employeeError,
  } = useQuery<APIResponseIface, Error>({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  // Ensure that employeeData.data is an array before calling filter
  const managerEmployees = Array.isArray(employeesData?.data)
    ? employeesData?.data.filter((employees) => employees.role === 'Manager')
    : []; // Return an empty array if employeeData.data is not an array
  console.log(managerEmployees);

  // Ensure that employeeData.data is an array before calling filter
  const venueManagerEmployees = Array.isArray(employeesData?.data)
    ? employeesData?.data.filter(
        (employees) => employees.role === 'VENUE_MANAGER'
      )
    : []; // Return an empty array if employeeData.data is not an array
  //  console.log(venueManagerEmployees);

  // Ensure that employeeData.data is an array before calling filter
  const consultantEmployees = Array.isArray(employeesData?.data)
    ? employeesData?.data.filter((employees) => employees.role === 'Consultant')
    : []; // Return an empty array if employeeData.data is not an array
  //  console.log("Consultant", consultantEmployees);

  const handleSubmit = (values: GuestRegistrationIface) => {
    console.log('VAL', values);
    // createProcess.mutate(values); // Trigger the mutation when new location is added
    createProcess.mutate(values, {
      onSuccess: () => {
        // Redirect to a different page on success
        navigate('/guest-registeration'); // Replace with the desired route
      },
      onError: (error) => {
        // Handle any error here if needed
        console.error('Mutation error:', error);
      },
    });
  };

  const {
    data: venueData,
    isLoading: venueLoading,
    error: venueError,
  } = useQuery<APIResponseIface, Error>({
    queryKey: ['venue'],
    queryFn: getVenue,
  });

  const {
    data: locationData,
    isLoading: locationLoading,
    error: locationError,
  } = useQuery<APIResponseIface, Error>({
    queryKey: ['location'],
    queryFn: getLocations,
  });

  console.log(locationData?.data);

  const handleVenueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    const input = e.target.value;
    setFieldValue('venue', input);

    if (venueData?.data) {
      const suggestions = venueData.data.filter((venue: any) =>
        venue.venueName.toLowerCase().includes(input.toLowerCase())
      );
      setVenueSuggestions(suggestions);
    }
  };

  const handleSuggestionClick = (
    id: string,
    venueName: string,
    locationid: string,
    setFieldValue: any
  ) => {
    setFieldValue('venue', venueName);
    setVenueSuggestions([]);
    setSelectedVenue(id);

    const location = locationData?.data?.find(
      (loc: any) => loc?._id === locationid
    )?.name;
    setFieldValue('location', location);
    setLocationName(location);
  };

  // console.log(locationName)
  // console.log("Selected Venue", selectedVenue)

  const handleViewGuestList = () => {
    navigate('/guest/list'); // Navigate to the /add-guest page
  };

  const [selectedManager, setSelectedManager] = useState('');

  const handleManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedManager(selectedValue);
    console.log('Manager Selected:', selectedValue);
    // Add any other custom logic if needed
  };

  // console.log("Selected Manager: ", selectedManager)

  return (
    <div className='flex flex-1 flex-col  shadow-lg p-2 pt-0  overflow-x-hidden rounded-md overflow-y-auto'>
      {createProcess.isPending && (
        <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-md z-10'>
          <div className='flex items-center space-x-2 animate-pulse'>
            <span className='text-xl font-semibold text-blue-600'>
              Processing...
            </span>
          </div>
        </div>
      )}
      <div className='flex p-1 justify-between items-center w-full'>
        <div>
          <h2 className='font-bold text-lg text-black'>
            <i className='ri-sticky-note-add-line'></i> New Guest Registration
          </h2>
        </div>
        <div>
          <button
            onClick={handleViewGuestList}
            className='btn btn-sm bg-purple-400 text-white hover:bg-purple-500 hover:text-white'>
            View List
          </button>
        </div>
      </div>

      <div className='flex flex-1 flex-col overflow-y-auto  pb-8  p-5'>
        <div className='flex flex-1 justify-center items-center gap-3 w-full'>
          <Formik
            initialValues={initialFormData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              handleSubmit,
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center items-center m-auto shadow-md rounded-lg z-0 overflow-y-auto'>
                  <div className='sm:w-full  p-5  bg-white  border border-gray-400 rounded-sm'>
                    <div className='border mt-3 border-gray-400 pt-6 pb-4 relative '>
                      <div className='absolute ml-3 px-1 -top-3 bg-white font-medium text-purple-600'>
                        <h3>Mainn Applicant Details</h3>
                      </div>
                      <div className='grid grid-cols-2 gap-4 px-4'>
                        <div className=''>
                          <label
                            htmlFor='Firstname'
                            className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                              errors.firstName &&
                              touched.firstName &&
                              'border-red-500'
                            }`}>
                            <Field
                              type='text'
                              id='firstName'
                              name='firstName'
                              className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0'
                              placeholder='Firstname'
                            />
                            <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                              First Name*
                            </span>
                          </label>

                          <ErrorMessage
                            name='firstName'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>

                        <div className=''>
                          <label
                            htmlFor='middleName'
                            className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                              errors.middleName &&
                              touched.middleName &&
                              'border-red-500'
                            }`}>
                            <Field
                              type='text'
                              id='middleName'
                              name='middleName'
                              className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0'
                              placeholder='Middle Name'
                            />
                            <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                              Middle Name
                            </span>
                          </label>

                          <ErrorMessage
                            name='middleName'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>

                        <div className=''>
                          <label
                            htmlFor='lastName'
                            className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                              errors.lastName &&
                              touched.lastName &&
                              'border-red-500'
                            }`}>
                            <Field
                              type='text'
                              id='lastName'
                              name='lastName'
                              className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0'
                              placeholder='lastName'
                            />
                            <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                              Last Name*
                            </span>
                          </label>

                          <ErrorMessage
                            name='lastName'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>

                        <div className=''>
                          <label
                            htmlFor='Phone'
                            className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                              errors.phone && touched.phone && 'border-red-500'
                            }`}>
                            <Field
                              type='text'
                              id='phone'
                              name='phone'
                              className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0'
                              placeholder='phone'
                            />
                            <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                              Phone*
                            </span>
                          </label>

                          <ErrorMessage
                            name='phone'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>

                        <div className=''>
                          <label
                            htmlFor='Email'
                            className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                              errors.email && touched.email && 'border-red-500'
                            }`}>
                            <Field
                              type='text'
                              id='email'
                              name='email'
                              className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0'
                              placeholder='email'
                            />
                            <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                              Email*
                            </span>
                          </label>

                          <ErrorMessage
                            name='email'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='border mt-3 border-gray-400 pt-6 pb-4 relative rounded-md'>
                      <div className='absolute ml-3 px-1 -top-3 bg-white font-medium text-purple-600'>
                        <h3>Venue</h3>
                      </div>
                      <div className='grid grid-cols-2 gap-4 px-4'>
                        <div className='relative'>
                          <Field
                            type='text'
                            id='venue'
                            name='venue'
                            value={values.venue}
                            placeholder='Start typing to search venues...'
                            className='block w-full p-2 border border-gray-300 rounded-md'
                            onChange={(e: React.ChangeEvent<any>) =>
                              handleVenueChange(e, setFieldValue)
                            }
                          />
                          {venueSuggestions.length > 0 && (
                            <ul className='absolute z-10 bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto w-full'>
                              {venueSuggestions.map(
                                (venue: any, index: number) => (
                                  <li
                                    key={index}
                                    className='p-2 cursor-pointer hover:bg-gray-200'
                                    // onClick={() => handleSuggestionClick(venue._id, venue.venueName, venue.location, setFieldValue)}
                                    onClick={() => {
                                      handleSuggestionClick(
                                        venue._id,
                                        venue?.venueName,
                                        venue?.location,
                                        setFieldValue
                                      ); // Existing call
                                      // setFieldValue("location", venue?.location); // Update location value directly
                                    }}>
                                    {venue.venueName}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>

                        <div className=''>
                          <label
                            htmlFor='Date'
                            className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                              errors.date && touched.date && 'border-red-500'
                            }`}>
                            <Field
                              type='date'
                              id='date'
                              name='date'
                              className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0'
                              placeholder='Date'
                            />
                            <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                              Date
                            </span>
                          </label>

                          <ErrorMessage
                            name='date'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>

                        <div className=''>
                          <label
                            htmlFor='Location'
                            className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                              errors.location &&
                              touched.location &&
                              'border-red-500'
                            }`}>
                            <Field
                              type='text'
                              id='location'
                              name='location'
                              className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0'
                              placeholder='location'
                              value={locationName}
                            />
                            <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                              Location*
                            </span>
                          </label>

                          <ErrorMessage
                            name='location'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='border mt-3 border-gray-400 pt-6 pb-4 relative rounded-md'>
                      <div className='absolute ml-3 px-1 -top-3 bg-white font-medium text-purple-600'>
                        <h3>Reference</h3>
                      </div>
                      <div className='grid grid-cols-2 gap-4 px-4'>
                        <div className=''>
                          <label
                            htmlFor='Manager'
                            className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                              errors.location &&
                              touched.location &&
                              'border-red-500'
                            }`}>
                            {/* <Field
                              as="select"
                              id="manager"
                              name="manager"
                              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                handleManagerChange(e); // Call your custom handler
                                form.setFieldValue("manager", selectedValue); // Update Formik state
                              }}
                            >
                              <option value="" disabled>
                                -- Select Manager --
                              </option>
                              
                              {managerEmployees?.map((employees: any) => (
                                selectedVenue === employees.venue ?
                              <option key={employees?._id} value={employees?._id}>
                                {employees?.userName}
                              </option>
                              :
                              null
                            ))}
                            </Field> */}
                            <Field name='manager'>
                              {({ field, form }: any) => (
                                <select
                                  {...field}
                                  id='manager'
                                  className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0'
                                  onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    handleManagerChange(e); // Call your custom handler
                                    form.setFieldValue(
                                      'manager',
                                      selectedValue
                                    ); // Update Formik state
                                  }}>
                                  <option value=''>-- Select Manager --</option>

                                  {venueManagerEmployees?.map(
                                    (employees: any) =>
                                      selectedVenue === employees.venue ? (
                                        <option
                                          key={employees?._id}
                                          value={employees?._id}>
                                          {employees?.userName}
                                        </option>
                                      ) : null
                                  )}
                                </select>
                              )}
                            </Field>

                            <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                              Manager*
                            </span>
                          </label>

                          <ErrorMessage
                            name='manager'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>

                        <div className=''>
                          <label
                            htmlFor='Consultant'
                            className={`relative block rounded-md border border-gray-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ${
                              errors.location &&
                              touched.location &&
                              'border-red-500'
                            }`}>
                            <Field
                              as='select'
                              id='consultant'
                              name='consultant'
                              className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0'>
                              <option
                                value=''
                                disabled>
                                -- Select consultanat --
                              </option>
                              {consultantEmployees?.map((employees: any) =>
                                selectedManager === employees.reportingTo ? (
                                  <option
                                    key={employees?._id}
                                    value={employees?.userName}>
                                    {employees?.userName}
                                  </option>
                                ) : null
                              )}
                            </Field>
                            <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 font-medium bg-white p-0.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                              Consultant*
                            </span>
                          </label>

                          <ErrorMessage
                            name='consultant'
                            component='div'
                            className='text-red-500 text-sm'
                          />
                        </div>
                      </div>

                      <div className='px-4 mt-5'>
                        <button
                          className='btn w-full btn-md bg-purple-400 text-white hover:bg-purple-500 hover:text-white mt-2 '
                          type='submit'>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default GuestRegistration;

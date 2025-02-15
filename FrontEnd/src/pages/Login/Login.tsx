import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../../store/slices/authSlice'; // Redux actions
import api from '../../utils/axiosConfig'; // Axios configuration
import './login.module.css'; // Import your specific styles

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initial form values
  const initialValues = {
    email: 'holidaytest@gmail.com',
    password: 'Test@123',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters long')
      .required('Password is required'),
  });

  // Form submission handler
  const handleSubmit = async (
    values: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await api.post('/auth/login', values);
      console.log(response);
      const { user, accessToken } = response.data.data;

      console.log(response.data);

      // Dispatch login success action with the user's role
      dispatch(
        loginSuccess({
          user,
          token: accessToken,
          role: user.role.toLowerCase(),
        })
      );
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error: any) {
      // Handle specific error messages from the server
      if (error.response && error.response.data && error.response.data.errors) {
        const errorData = error.response.data.errors;
        if (errorData.email) setFieldError('email', errorData.email);
        if (errorData.password) setFieldError('password', errorData.password);
        if (errorData.general) setErrorMessage(errorData.general);
      } else {
        setErrorMessage(
          'An unexpected error occurred. Please try again later.'
        );
      }

      // Dispatch login failure action
      const errorMsg =
        error.response?.data?.email ||
        error.response?.data?.password ||
        'Invalid email or password';
      dispatch(loginFailure(errorMsg));
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div
      className='relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12'
      style={{ minWidth: '100vw' }}>
      <img
        src='/assets/images/beams.jpg'
        alt=''
        className='absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2'
        width={'100%'}
      />
      <div className='absolute inset-0 bg-[url(/assets/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]' />

      <div
        className='flex z-0 items-center'
        style={{ minWidth: '100vw' }}>
        {/* Left side: Image */}
        <div className='md:w-1/2 lg:w-2/3 flex px-16 items-end'>
          <div className='bg-white p-10 divide-y max-w-96 sm:rounded-lg  shadow-xl ring-1 ring-gray-900/5  divide-gray-300/50'>
            <div className='space-y-6 text-base leading-7 text-gray-600'>
              <img
                src='/assets/images/thc-logo.png'
                className='w-36'
                alt='The Holidays Club'
              />
              <p>
                At The Holidays Club, we take pride in crafting an unparalleled
                escape where luxury meets nature. Immerse yourself in a world of
                sophistication and serenity, where every detail is designed to
                exceed expectations and create an exceptional retreat for our
                valued guests.
              </p>
              <ul className='space-y-4'>
                <li className='flex items-center'>
                  <svg
                    className='h-6 w-6 flex-none fill-slate-300 stroke-slate-900 stroke-2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <circle
                      cx={12}
                      cy={12}
                      r={11}
                    />
                    <path
                      d='m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9'
                      fill='none'
                    />
                  </svg>
                  <p className='ml-4'>Invest in your simply neighborhood</p>
                </li>
                <li className='flex items-center'>
                  <svg
                    className='h-6 w-6 flex-none fill-slate-300 stroke-slate-900 stroke-2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <circle
                      cx={12}
                      cy={12}
                      r={11}
                    />
                    <path
                      d='m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9'
                      fill='none'
                    />
                  </svg>
                  <p className='ml-4'>Support people in free text extreme</p>
                </li>
                <li className='flex items-center'>
                  <svg
                    className='h-6 w-6 flex-none fill-slate-300 stroke-slate-900 stroke-2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <circle
                      cx={12}
                      cy={12}
                      r={11}
                    />
                    <path
                      d='m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9'
                      fill='none'
                    />
                  </svg>
                  <p className='ml-4'>Largest global Holidays Club</p>
                </li>
              </ul>
              <p>
                We at <strong> The Holidays Club</strong> brought very efficient
                and reliable services for your needs.
              </p>
            </div>
            <div className='pt-8 text-base font-semibold leading-7'>
              <p className='text-slate-500'>
                Want to dig deeper into The Holidays Club?
              </p>
              <p>
                <a
                  href='https://theholidaysclubs.com/'
                  target='_blank'
                  className='text-slate-700 hover:text-slate-900'>
                  Visit our Website →
                </a>
              </p>
            </div>
          </div>
          <div className='w-1/4'>
            <img
              src='/assets/images/delivery-nextin.png'
              alt=''
            />
          </div>
        </div>

        {/* Right side: Form */}
        <div className='md:w-1/2 lg:w-1/3 justify-center items-end px-8 py-6'>
          <div className='w-full max-w-md'>
            <div className='relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10'>
              <div className='mx-auto max-w-md'>
                <div className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-10'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>

                  <h2 className='font-bold text-2xl text-slate-900'>Sign In</h2>
                </div>
                <div className='divide-y divide-gray-300/50'>
                  <div className='space-y py-8 text-base leading-7 text-slate-900'>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}>
                      {({ errors, touched }) => (
                        <Form>
                          {/* Email Field */}
                          <div className='mb-4'>
                            <label
                              htmlFor='email'
                              className='block text-sm font-medium'>
                              Email Address*
                            </label>
                            <Field
                              id='email'
                              name='email'
                              type='email'
                              className={`mt-1 block w-full p-3 border border-gray-300 rounded ${
                                errors.email && touched.email
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              name='email'
                              component='div'
                              className='text-red-500 text-sm mt-1'
                            />
                          </div>

                          {/* Password Field */}
                          <div className='mb-4'>
                            <label
                              htmlFor='password'
                              className='block text-sm font-medium'>
                              Password*
                            </label>
                            <Field
                              id='password'
                              name='password'
                              type='password'
                              className={`mt-1 block w-full p-3 border border-gray-300 rounded ${
                                errors.password && touched.password
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            />
                            <ErrorMessage
                              name='password'
                              component='div'
                              className='text-red-500 text-sm mt-1'
                            />
                          </div>

                          {/* General Error Message */}
                          {errorMessage && (
                            <div className='text-red-500 text-sm mt-4 mb-4'>
                              {errorMessage}
                            </div>
                          )}

                          {/* Submit Button */}
                          <button
                            type='submit'
                            className='w-full p-3 bg-slate-900 text-white text-xl rounded mt-4 hover:bg-slate-950'>
                            Sign In
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className='pt-8 text-base font-semibold leading-7'>
                    <p className='text-slate-500'>Not have an account yet?</p>
                    <p>
                      {/* <a
                        href="https://nextinlogistics.com/register"
                        className="text-slate-700 hover:text-slate-900"
                      >
                        Click to Register →
                      </a> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

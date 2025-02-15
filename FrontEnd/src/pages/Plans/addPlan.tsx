import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { clearValidationErrors } from '../../store/slices/serverValidationError';
import { PlanIface } from '../../types/typesPlan';
import { addPlan } from '../../utils/http-requests';
import { useNavigate } from 'react-router-dom';

const AddPlan = () => {
  //   const initialValues = {
  //     planName: "",
  //     planType: "",
  //     planAmount: "",
  //   };

  //   const validationSchema = Yup.object({
  //     planName: Yup.string().required("Plan Name is required"),
  //     planType: Yup.string().required("Plan Type is required"),
  //     planAmount: Yup.number()
  //       .required("Plan Amount is required")
  //       .typeError("Plan Amount must be a number"),
  //   });

  //   const handleSubmit = (values:any) => {
  //     console.log("Form submitted:", values);
  //     // Add logic for submitting form data to the backend here
  //   };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Plan Name is required'),
    // type: Yup.string().required("Plan Type is required"),
    tenure: Yup.string().required('Tenure is required'),
    nightsAvailable: Yup.string().required('Nights Available is required'),
    currency: Yup.string().required('Currency is required'),
    basePrice: Yup.string().required('Base Price is required'),
    minimumPrice: Yup.string().required('Minimum Price is required'),
    amcCharges: Yup.string().required('AMC Charges is required'),
    noOfDaysForIntiationBeforeBooking:
      Yup.string().required('This is required'),
    // ammount: Yup.number()
    //   .required("Plan Amount is required")
    //   .typeError("Plan Amount must be a number"),
  });

  const initialValues = {
    name: '',
    // type: "",
    tenure: '',
    nightsAvailable: '',
    currency: '',
    basePrice: '',
    minimumPrice: '',
    amcCharges: '',
    noOfDaysForIntiationBeforeBooking: '',
    planDescription: '',
    isActive: 'true',
    // ammount: "",
    bookingSpecialComment: '',
  };

  const handleSubmit = async (
    values: PlanIface,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    dispatch(clearValidationErrors());
    console.log('Form submitted:', values);
    await addPlan(values);
    alert('Plan added successfully!');
    navigate('/plans');
    // Add logic for submitting form data to the backend here
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className=' bg-gray-50 flex items-center justify-center w-full'>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form className='bg-gray-50 p-6 rounded-lg shadow-xl w-full m-4 '>
              <h2 className='text-xl font-bold mb-4 text-center'>
                Add New Plan
              </h2>

              <div className='container'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='col mb-4'>
                    <label
                      htmlFor='name'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='name'
                        id='name'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='Plan Name'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        Plan Name
                      </span>
                    </label>
                    <ErrorMessage
                      name='name'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  {/* <div className="col mb-4">
              <label
                htmlFor="type"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <Field
                  type="text"
                  name="type"
                  id="type"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2"
                  placeholder="Plan Type"
                />
                <span
                  className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  Plan Type
                </span>
              </label>
              <ErrorMessage
                name="type"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div> */}

                  <div className='col mb-4'>
                    <label
                      htmlFor='tenure'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='tenure'
                        id='tenure'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='Tenure'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        Tenure*
                      </span>
                    </label>
                    <ErrorMessage
                      name='tenure'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  <div className='col mb-4'>
                    <label
                      htmlFor='nightsAvailable'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='nightsAvailable'
                        id='nightsAvailable'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='Nights Available'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        Nights Available*
                      </span>
                    </label>
                    <ErrorMessage
                      name='nightsAvailable'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  <div className='col mb-4'>
                    <label
                      htmlFor='currency'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='currency'
                        id='currency'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='Currency'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        Currency*
                      </span>
                    </label>
                    <ErrorMessage
                      name='currency'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  <div className='col mb-4'>
                    <label
                      htmlFor='basePrice'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='basePrice'
                        id='basePrice'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='Base Price'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        Base Price*
                      </span>
                    </label>
                    <ErrorMessage
                      name='basePrice'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  <div className='col mb-4'>
                    <label
                      htmlFor='minimumPrice'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='minimumPrice'
                        id='minimumPrice'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='Minimum Price'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        Minimum Price*
                      </span>
                    </label>
                    <ErrorMessage
                      name='minimumPrice'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  <div className='col mb-4'>
                    <label
                      htmlFor='amcCharges'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='amcCharges'
                        id='amcCharges'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='AMC Charges'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        AMC Charges*
                      </span>
                    </label>
                    <ErrorMessage
                      name='amcCharges'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  <div className='col mb-4'>
                    <label
                      htmlFor='noOfDaysForIntiationBeforeBooking'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='noOfDaysForIntiationBeforeBooking'
                        id='noOfDaysForIntiationBeforeBooking'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='No Of Days For Intiation Before Booking'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        No Of Days For Intiation Before Booking*
                      </span>
                    </label>
                    <ErrorMessage
                      name='noOfDaysForIntiationBeforeBooking'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  <div className='col mb-4'>
                    <label
                      htmlFor='planDescription'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='planDescription'
                        id='planDescription'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='Plan Description'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        Plan Description*
                      </span>
                    </label>
                    <ErrorMessage
                      name='planDescription'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  <div className='col mb-4'>
                    <label
                      htmlFor='bookingSpecialComment'
                      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'>
                      <Field
                        type='text'
                        name='bookingSpecialComment'
                        id='bookingSpecialComment'
                        className='peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2'
                        placeholder='Plan Type'
                      />
                      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
                        Booking Special Comment*
                      </span>
                    </label>
                    <ErrorMessage
                      name='bookingSpecialComment'
                      component='p'
                      className='text-red-500 text-xs mt-1'
                    />
                  </div>

                  {/* <div className="col mb-4">
              <label
                htmlFor="ammount"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <Field
                  type="number"
                  name="ammount"
                  id="ammount"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full p-2"
                  placeholder="Plan Amount"
                />
                <span
                  className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  Plan Amount
                </span>
              </label>
              <ErrorMessage
                name="ammount"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div> */}
                </div>
              </div>

              <button
                type='submit'
                className=' w-1/4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPlan;

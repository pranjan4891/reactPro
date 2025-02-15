import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { addAfform, addVenue, getAfform } from '../../utils/http-requests';
import { APIResponseIface } from '../../types/api-response';
import { AfformIface } from '../../types/typesAfform';
import { GuestRegistrationIface } from '../../types/GuestsRegistration';
import { useDispatch } from 'react-redux';
import { clearValidationErrors } from '../../store/slices/serverValidationError';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateGuest } from '../../utils/http-requests';
import { uploadImage } from '../../utils/http-requests';

const AfForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const steps = ['Personal Details', 'Contact & Plan', 'Offers & Official'];
  const queryClient = useQueryClient();

  const location = useLocation();
  const { userid } = location.state || {};
  console.log('Received userid: ', userid);

  const mutation = useMutation({
    mutationFn: (values: AfformIface) => addAfform(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['afform'] });
    },
    onError: (error: Error) => {},
  });

  const initialValues = {
    tempAfNo: '',
    dated: '',
    picture: '',
    applicantTitle: '',
    applicantFirstName: '',
    applicantMiddleName: '',
    applicantLastName: '',
    applicantDateOfBirth: '',
    applicantMarriageAnniversary: '',
    coApplicantTitle: '',
    coApplicantFirstName: '',
    coApplicantMiddleName: '',
    coApplicantLastName: '',
    nominee1Name: '',
    nominee1DateOfBirth: '',
    nominee2Name: '',
    nominee2DateOfBirth: '',
    nominee3Name: '',
    nominee3DateOfBirth: '',
    applicantCorrespondenceAddress: '',
    applicantPincode: '',
    applicantEmail: '',
    applicantPhoneResidential: '',
    applicantPhoneOffice: '',
    applicantMobile01: '',
    applicantMobile02: '',
    plan: '',
    remarks: '',
    specialOfferDetails: '',
    specialOfferWorth: '',
    specialOfferMonthOfExpiration: '',
    mainApplicantName: '',
    coApplicantName: '',
    manager: '',
    consultant: '',
  };

  const validationSchemas = [
    Yup.object({
      applicantFirstName: Yup.string().required('First name is required'),
      applicantLastName: Yup.string().required('Last name is required'),
      // email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    Yup.object({
      // phoneNumber: Yup.string().required('Phone number is required'),
      applicantCorrespondenceAddress: Yup.string().required(
        'Address is required'
      ),
    }),
    Yup.object({
      mainApplicantName: Yup.string().required('Enter the Name'),
    }),
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: AfformIface,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      console.log('this is 96');
      await updateGuest(userid, { afFormGenerated: true } as Partial<GuestRegistrationIface>);
      // await updateGuest(userid, { afFormGenerated: true });
      dispatch(clearValidationErrors());

      // Add the userid to the form values
      const valuesWithUserId = { ...values, userid };

      // Submit the form with the updated values
      await mutation.mutateAsync(valuesWithUserId);

      // await mutation.mutateAsync(values);
      resetForm();
      setCurrentStep(0);
      navigate('/guest-registeration');
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = (
    setFieldValue: FormikHelpers<any>['setFieldValue'],
    values: any, 
    setCurrentStep: (step: number) => void
) => {
    const currentValidationSchema = validationSchemas[currentStep];
    currentValidationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch((err) => {
        // If validation fails, show an alert or an error message
        alert('Please fill out all required fields.');
      });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setUploading(true);
  //     try {
  //       const uploadedImageUrl = await uploadImage(file);
  //       if (uploadedImageUrl) {
  //         setImageUrl(uploadedImageUrl);
  //         setFieldValue('picture', uploadedImageUrl); // Update Formik field
  //       }
  //     } catch (error) {
  //       console.error('Image upload failed:', error);
  //     } finally {
  //       setUploading(false);
  //     }
  //   }
  // };

  // const handleFileChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setUploading(true);
  //     try {
  //       const uploadedImageUrl = await uploadImage(file);
  //       if (uploadedImageUrl) {
  //         console.log(uploadedImageUrl)
  //         setImageUrl(uploadedImageUrl);
  //         setFieldValue('picture', uploadedImageUrl); // Update Formik's 'picture' field
  //       }
  //     } catch (error) {
  //       console.error('Image upload failed:', error);
  //     } finally {
  //       setUploading(false);
  //     }
  //   }
  // };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<AfformIface>['setFieldValue']
    ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const uploadedUrl = await uploadImage(file);
        if (uploadedUrl) {
          setUploadedImageUrl(uploadedUrl); // Store in local state
          setFieldValue('picture', uploadedUrl); // Update Formik state
        }
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const renderStep = (step: number, setFieldValue: any) => {
    switch (step) {
      case 0:
        return (
          <div className='space-y-6 '>
            {/* Temp A.F. No Section */}
            <div className='border rounded-lg p-6 bg-gray-50 shadow-lg'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div>
                    <label
                      htmlFor='tempAfNo'
                      className='block font-medium text-gray-700'>
                      Temp A.F. No*
                    </label>
                    <Field
                      type='text'
                      name='tempAfNo'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                    <ErrorMessage
                      name='tempAfNo'
                      component='div'
                      className='text-red-600 text-sm mt-1'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='dated'
                      className='block font-medium text-gray-700'>
                      Dated*
                    </label>
                    <Field
                      type='date'
                      name='dated'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                    <ErrorMessage
                      name='dated'
                      component='div'
                      className='text-red-600 text-sm mt-1'
                    />
                  </div>
                </div>
                {/* <div>
                    <label htmlFor="picture" className="block font-medium text-gray-700">Picture</label>
                    <input
                      type="file"
                      name="picture"
                      onChange={(event) => setFieldValue('picture', event.target.files?.[0])}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div> */}
                {/* <div style={{display:"flex", justifyContent: "end"}} className="mb-4">
                    <div>
                      <label
                        htmlFor="picture"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Upload Picture
                      </label>
                      <div>
                        <Upload className="text-primary" size={100} />
                      </div>
                      <div className="flex items-center gap-4">
                        <label
                          htmlFor="picture"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Choose File
                        </label>
                        <input
                          id="picture"
                          type="file"
                          name="picture"
                          onChange={(event) => setFieldValue('picture', event.target.files?.[0])}
                          className="hidden"
                        />
                        <span className="text-sm text-gray-500" id="file-name">
                        </span>
                      </div>
                    </div>
                  </div> */}
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-4'>
                    <label
                      htmlFor='picture'
                      className='cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                      Choose File
                    </label>
                    <input
                      id='picture'
                      type='file'
                      name='picture'
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                      className='hidden'
                    />
                    <span
                      className='text-sm text-gray-500'
                      id='file-name'>
                      {uploadedImageUrl
                        ? `Uploaded: ${uploadedImageUrl}`
                        : 'No file selected'}
                    </span>
                  </div>
                  {uploading && <p>Uploading...</p>}
                  {uploadedImageUrl && (
                    <img
                      src={`http://localhost:8000/${uploadedImageUrl}`}
                      alt='Uploaded'
                      className='w-32 h-32 object-cover'
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Main Applicant Section */}
            {/* <div className="border rounded-md p-6 bg-white shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Main Applicant</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="sernameMain" className="block font-medium text-gray-700">Title</label>
                    <Field as="select" name="sernameMain" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                    </Field>
                  </div>
                  <div>
                    <label htmlFor="firstNameMain" className="block font-medium text-gray-700">First Name*</label>
                    <Field type="text" name="firstNameMain" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    <ErrorMessage name="firstNameMain" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="middleNameMain" className="block font-medium text-gray-700">Middle Name</label>
                    <Field type="text" name="middleNameMain" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="lastNameMain" className="block font-medium text-gray-700">Last Name*</label>
                    <Field type="text" name="lastNameMain" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    <ErrorMessage name="lastNameMain" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="dobMain" className="block font-medium text-gray-700">Date of Birth*</label>
                    <Field type="date" name="dobMain" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    <ErrorMessage name="dobMain" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="domMain" className="block font-medium text-gray-700">Marriage Anniversary</label>
                    <Field type="date" name="domMain" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                </div>
              </div> */}

            <div className='border rounded-lg p-6 bg-gray-50 shadow-lg'>
              <h2 className='text-xl font-semibold mb-6 text-gray-900'>
                Main Applicant
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Title Field */}
                <div>
                  <label
                    htmlFor='applicantTitle'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Title
                  </label>
                  <Field
                    as='select'
                    name='applicantTitle'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'>
                    <option value=''>Select</option>
                    <option value='Mr'>Mr</option>
                    <option value='Mrs'>Mrs</option>
                    <option value='Ms'>Ms</option>
                  </Field>
                </div>

                {/* First Name Field */}
                <div>
                  <label
                    htmlFor='applicantFirstName'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    First Name <span className='text-red-500'>*</span>
                  </label>
                  <Field
                    type='text'
                    name='applicantFirstName'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                  <ErrorMessage
                    name='applicantFirstName'
                    component='div'
                    className='text-red-500 text-xs mt-1'
                  />
                </div>

                {/* Middle Name Field */}
                <div>
                  <label
                    htmlFor='applicantMiddleName'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Middle Name
                  </label>
                  <Field
                    type='text'
                    name='applicantMiddleName'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                {/* Last Name Field */}
                <div>
                  <label
                    htmlFor='applicantLastName'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Last Name <span className='text-red-500'>*</span>
                  </label>
                  <Field
                    type='text'
                    name='applicantLastName'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                  <ErrorMessage
                    name='applicantLastName'
                    component='div'
                    className='text-red-500 text-xs mt-1'
                  />
                </div>

                {/* Date of Birth Field */}
                <div>
                  <label
                    htmlFor='applicantDateOfBirth'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Date of Birth <span className='text-red-500'>*</span>
                  </label>
                  <Field
                    type='date'
                    name='applicantDateOfBirth'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                  <ErrorMessage
                    name='applicantDateOfBirth'
                    component='div'
                    className='text-red-500 text-xs mt-1'
                  />
                </div>

                {/* Marriage Anniversary Field */}
                <div>
                  <label
                    htmlFor='applicantMarriageAnniversary'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Marriage Anniversary
                  </label>
                  <Field
                    type='date'
                    name='applicantMarriageAnniversary'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>
            </div>

            {/* Co-Applicant Section */}
            {/* <div className="border rounded-md p-6 bg-white shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Co-Applicant</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="sernameCo" className="block font-medium text-gray-700">Title</label>
                    <Field as="select" name="sernameCo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                    </Field>
                  </div>
                  <div>
                    <label htmlFor="firstNameCo" className="block font-medium text-gray-700">First Name</label>
                    <Field type="text" name="firstNameCo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="middleNameCo" className="block font-medium text-gray-700">Middle Name</label>
                    <Field type="text" name="middleNameCo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="lastNameCo" className="block font-medium text-gray-700">Last Name</label>
                    <Field type="text" name="lastNameCo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                </div>
              </div> */}

            <div className='border rounded-lg p-6 bg-gray-50 shadow-lg'>
              <h2 className='text-xl font-semibold mb-6 text-gray-900'>
                Co-Applicant
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Title Field */}
                <div>
                  <label
                    htmlFor='coApplicantTitle'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Title
                  </label>
                  <Field
                    as='select'
                    name='coApplicantTitle'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'>
                    <option value=''>Select</option>
                    <option value='Mr'>Mr</option>
                    <option value='Mrs'>Mrs</option>
                    <option value='Ms'>Ms</option>
                  </Field>
                </div>

                {/* First Name Field */}
                <div>
                  <label
                    htmlFor='coApplicantFirstName'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    First Name
                  </label>
                  <Field
                    type='text'
                    name='coApplicantFirstName'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                {/* Middle Name Field */}
                <div>
                  <label
                    htmlFor='coApplicantMiddleName'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Middle Name
                  </label>
                  <Field
                    type='text'
                    name='coApplicantMiddleName'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                {/* Last Name Field */}
                <div>
                  <label
                    htmlFor='coApplicantLastName'
                    className='block text-sm font-medium text-gray-700 mb-1'>
                    Last Name
                  </label>
                  <Field
                    type='text'
                    name='coApplicantLastName'
                    className='block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>
            </div>

            {/* Nomination Section */}
            <div className='border rounded-lg p-6 bg-gray-50 shadow-lg'>
              <h2 className='text-lg font-semibold mb-4 text-gray-800'>
                Nomination
              </h2>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                  <div>
                    <label
                      htmlFor={`nominee${index + 1}Name`}
                      className='block font-medium text-gray-700'>
                      Nominee {index + 1} Name
                    </label>
                    <Field
                      type='text'
                      name={`nominee${index + 1}Name`}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`nominee${index + 1}DateOfBirth`}
                      className='block font-medium text-gray-700'>
                      Nominee {index + 1} DOB
                    </label>
                    <Field
                      type='date'
                      name={`nominee${index + 1}DateOfBirth`}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className='space-y-6'>
            {/* Contact Information Section */}
            <div className='border rounded-lg p-6 bg-gray-50 shadow-lg'>
              <h2 className='text-lg font-semibold mb-4 text-gray-800'>
                Contact Information
              </h2>
              <div className='space-y-6'>
                <div>
                  <label
                    htmlFor='applicantCorrespondenceAddress'
                    className='block font-medium text-gray-700'>
                    Correspondence Address*
                  </label>
                  <Field
                    as='textarea'
                    name='applicantCorrespondenceAddress'
                    rows={3}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                  <ErrorMessage
                    name='applicantCorrespondenceAddress'
                    component='div'
                    className='text-red-600 text-sm mt-1'
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='applicantPincode'
                      className='block font-medium text-gray-700'>
                      Pincode
                    </label>
                    <Field
                      type='text'
                      name='applicantPincode'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='applicantEmail'
                      className='block font-medium text-gray-700'>
                      Email
                    </label>
                    <Field
                      type='email'
                      name='applicantEmail'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='applicantPhoneResidential'
                      className='block font-medium text-gray-700'>
                      Phone (Residential)
                    </label>
                    <Field
                      type='text'
                      name='applicantPhoneResidential'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='applicantPhoneOffice'
                      className='block font-medium text-gray-700'>
                      Phone (Office)
                    </label>
                    <Field
                      type='text'
                      name='applicantPhoneOffice'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='applicantMobile01'
                      className='block font-medium text-gray-700'>
                      Mobile (01)
                    </label>
                    <Field
                      type='text'
                      name='applicantMobile01'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='applicantMobile02'
                      className='block font-medium text-gray-700'>
                      Mobile (02)
                    </label>
                    <Field
                      type='text'
                      name='applicantMobile02'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Detail Section */}
            <div className='border rounded-lg p-6 bg-gray-50 shadow-lg'>
              <h2 className='text-lg font-semibold mb-4 text-gray-800'>
                Plan Detail
              </h2>
              <div>
                <label
                  htmlFor='plan'
                  className='block font-medium text-gray-700'>
                  Select a Plan
                </label>
                <Field
                  as='select'
                  name='plan'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'>
                  <option value=''>Select a Plan</option>
                  <option value='basic'>Basic Plan</option>
                  <option value='premium'>Premium Plan</option>
                  <option value='gold'>Gold Plan</option>
                  <option value='platinum'>Platinum Plan</option>
                </Field>
              </div>
            </div>

            {/* Remarks Section */}
            <div className='border rounded-lg p-6 bg-gray-50 shadow-lg'>
              <h2 className='text-lg font-semibold mb-4 text-gray-800'>
                Remarks
              </h2>
              <div>
                <Field
                  as='textarea'
                  name='remarks'
                  rows={4}
                  placeholder='Maximum 1000 Characters'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  maxLength={1000}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className='space-y-6'>
            {/* Special Offers Section */}
            <div className='border rounded-lg p-6 bg-gray-50 shadow-lg'>
              <h2 className='text-lg font-semibold mb-4 text-gray-800'>
                Special Offers
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='specialOfferDetails'
                    className='block font-medium text-gray-700'>
                    Special Offer Details
                  </label>
                  <Field
                    type='text'
                    name='specialOfferDetails'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label
                    htmlFor='specialOfferWorth'
                    className='block font-medium text-gray-700'>
                    Offer Worth
                  </label>
                  <Field
                    type='text'
                    name='specialOfferWorth'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div className='md:col-span-2'>
                  <label
                    htmlFor='specialOfferMonthOfExpiration'
                    className='block font-medium text-gray-700'>
                    Month of Expiration
                  </label>
                  <Field
                    as='select'
                    name='specialOfferMonthOfExpiration'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'>
                    <option value=''>Select Month</option>
                    {[
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ].map((month) => (
                      <option
                        key={month.toLowerCase()}
                        value={month.toLowerCase()}>
                        {month}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            </div>

            {/* For Official Use Section */}
            <div className='border rounded-lg p-6 bg-gray-50 shadow-lg'>
              <h2 className='text-lg font-semibold mb-4 text-gray-800'>
                For Official Use
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='mainApplicantName'
                    className='block font-medium text-gray-700'>
                    Main Applicant Name
                  </label>
                  <Field
                    type='text'
                    name='mainApplicantName'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                  <ErrorMessage
                    name='mainApplicantName'
                    component='div'
                    className='text-red-500 text-xs mt-1'
                  />
                </div>
                <div>
                  <label
                    htmlFor='coApplicantName'
                    className='block font-medium text-gray-700'>
                    Co-applicant Name
                  </label>
                  <Field
                    type='text'
                    name='coApplicantName'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label
                    htmlFor='manager'
                    className='block font-medium text-gray-700'>
                    Manager
                  </label>
                  <Field
                    as='select'
                    name='manager'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'>
                    <option value=''>Select Manager</option>
                  </Field>
                </div>
                <div>
                  <label
                    htmlFor='consultant'
                    className='block font-medium text-gray-700'>
                    Consultant
                  </label>
                  <Field
                    as='select'
                    name='consultant'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'>
                    <option value=''>Select Consultant</option>
                  </Field>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full'>
      <div className='mx-auto'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='px-6 py-8'>
            <h1 className='text-2xl font-bold text-gray-900 text-center mb-8'>
              AF Form
            </h1>
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
            />

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemas[currentStep]}
              onSubmit={handleSubmit}>
              {({ setFieldValue, values }) => (
                <Form className='mt-8 space-y-6'>
                  {renderStep(currentStep, setFieldValue)}

                  <div className='flex justify-between pt-6'>
                    <button
                      type='button'
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className={`inline-flex items-center px-4 py-2 rounded-md ${
                        currentStep === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                      Previous
                    </button>

                    {currentStep === steps.length - 1 ? (
                      <button
                        type='submit'
                        className='inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                        Submit Form
                      </button>
                    ) : (
                      <button
                        type='button'
                        onClick={() =>
                          handleNext(setFieldValue, values, setCurrentStep)
                        }
                        className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
                        Next
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfForm;

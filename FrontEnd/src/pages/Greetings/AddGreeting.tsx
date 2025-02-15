import { HeartHandshake } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import QuillTextEditor from '../../components/common/react-quill';

function AddGreeting() {
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const occasions = [
    {
      id: 'diwali',
      name: 'Diwali',
      description: 'Festival of Lights',
      image:
        'https://blog.officeholidays.com/wp-content/uploads/2021/11/blog-diwali.jpg',
    },
    {
      id: 'eid',
      name: 'Eid',
      description: 'Festival of Breaking the Fast',
      image:
        'https://www.timeoutriyadh.com/cloud/timeoutriyadh/2025/01/13/eid-al-fitr.png',
    },
    {
      id: 'holi',
      name: 'Holi',
      description: 'Festival of Colors',
      image:
        'https://www.podareducation.org/uploads/content/2024-3-22--14-40-21-311_the-story-behind-why-do-we-celebrate-the-holi-festival-banner.jpg',
    },
    {
      id: 'navratri',
      name: 'Navratri',
      description: 'Nine Nights Festival',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvYvWiJbx7Cepb6MqOXBFS69efvVltyCK-qA&s',
    },
    {
      id: 'christmas',
      name: 'Christmas',
      description: 'Festival of Joy',
      image:
        'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80',
    },
    {
      id: 'onam',
      name: 'Onam',
      description: 'Harvest Festival of Kerala',
      image:
        'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80',
    },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Clean up previous preview URL to avoid memory leaks
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOccasion) {
      alert('Please select a festival');
      return;
    }
    if (!selectedImage) {
      alert('Please upload a greeting image');
      return;
    }
    if (!description.trim()) {
      alert('Please write a message');
      return;
    }
    console.log({ selectedOccasion, description, selectedImage });
  };

  // Cleanup preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className='w-full py-2 px-2 sm:px-6 lg:px-2'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-lg font-extrabold flex gap-1 items-center text-black'>
            <HeartHandshake className='text-purple-500 text-xl' /> Greetings
          </h3>
        </div>
        <div className='flex gap-3'>
          <Link
            to='/guest-registeration'
            className='btn btn-sm rounded-full bg-purple-400 shadow-lg hover:shadow-sm hover:bg-purple-500 transition-all'>
            Greeting Lists
          </Link>
        </div>
      </div>
      <div className='flex flex-col w-full p-1 px-2 text-sm'>
        <div className='max-w-7xl mx-auto'>
          <div className='bg-purple-50 rounded-2xl shadow-xl overflow-hidden'>
            <div className='px-6 py-8 sm:p-10'>
              <div className='text-center mb-8'>
                <h2 className='text-4xl font-bold text-purple-900 mb-2'>
                  Create Festival Greeting
                  <span className='ml-2'>🎉</span>
                </h2>
                <p className='text-purple-600 text-lg'>
                  Share joy and happiness with your loved ones
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className='space-y-8'>
                {/* Occasion Selection */}
                <div>
                  <label className='block text-lg font-medium text-purple-900 mb-4'>
                    Select Festival
                  </label>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {occasions.map((occasion) => (
                      <div
                        key={occasion.id}
                        className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                          selectedOccasion === occasion.id
                            ? 'ring-4 ring-purple-500 ring-offset-2'
                            : 'hover:shadow-lg'
                        }`}
                        onClick={() => setSelectedOccasion(occasion.id)}>
                        <div className='relative h-40'>
                          <img
                            src={occasion.image}
                            alt={occasion.name}
                            className='w-full h-full object-cover'
                          />
                          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                          <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
                            <h3 className='font-semibold text-lg'>
                              {occasion.name}
                            </h3>
                            <p className='text-sm text-gray-200'>
                              {occasion.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div className='space-y-2'>
                  <label className='block text-lg font-medium text-purple-900'>
                    Upload Greeting Image
                  </label>
                  <div
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors duration-300 ${
                      previewUrl
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-purple-300 hover:border-purple-400'
                    }`}>
                    <div className='space-y-2 text-center'>
                      {previewUrl ? (
                        <div
                          className='relative group cursor-pointer'
                          onClick={handleImageClick}>
                          <img
                            src={previewUrl}
                            alt='Preview'
                            className='mx-auto h-48 w-auto rounded-lg'
                          />
                          <div className='absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                            <span className='text-white text-sm'>
                              Click to change image
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className='cursor-pointer'
                          onClick={handleImageClick}>
                          <svg
                            className='mx-auto h-16 w-16 text-purple-400'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 48 48'>
                            <path
                              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <div className='flex text-sm text-purple-600 justify-center'>
                            <span className='relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500'>
                              Upload a file
                            </span>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                          <p className='text-xs text-purple-500'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type='file'
                        className='hidden'
                        accept='image/*'
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Rich Text Editor */}
                <div className='space-y-2'>
                  <label className='block text-lg font-medium text-purple-900'>
                    Your Message
                  </label>
                  <div className='rounded-xl overflow-hidden'>
                    <QuillTextEditor
                      value={description}
                      onChange={setDescription}
                      className='bg-white text-black text-2xl rounded-xl'
                      style={{ height: '200px' }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className='pt-8'>
                  <button
                    type='submit'
                    className='w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105'>
                    Create Greeting
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGreeting;

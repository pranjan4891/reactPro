import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { hideLoader } from '../../store/slices/loaderSlice';

const Loader: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, status, closeDuration } = useSelector((state: RootState) => state.loader);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressBarRef.current && isLoading && status !== 'processing') {
      const progressBar = progressBarRef.current;

      // Reset width
      progressBar.style.width = '0%';

      // Start animation after a small delay
      const timeout = setTimeout(() => {
        progressBar.style.width = '100%';
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [isLoading, status, closeDuration]);

  if (!isLoading) return null;

  let message: string;
  let iconComponent: JSX.Element | null;

  switch (status) {
    case 'processing':
      message = 'Processing, Please Wait...';
      iconComponent = <span className="loading loading-spinner text-primary"></span>;
      break;
    case 'success':
      message = 'Success!';
      iconComponent = <span className="text-green-500"><i className="ri-checkbox-circle-fill text-5xl"></i></span>;
      break;
    case 'error':
      message = 'An error occurred!';
      iconComponent = <span className="text-red-500 text-2xl"><i className="ri-close-large-fill text-5xl"></i></span>;
      break;
    case 'failed':
      message = 'Failed!';
      iconComponent = <span className="text-orange-500 text-3xl"><i className="ri-error-warning-fill text-3xl"></i></span>;
      break;
    default:
      message = '';
      iconComponent = null;
  }

  const handleClose = () => {
    dispatch(hideLoader());
  };

  return (
    <div className={`fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50`}>
      <div className={`flex flex-col rounded-sm border border-slate-300 shadow-xl min-w-96 ${status === 'processing' && "py-2"}`}>
        <div className="flex gap-3 px-4 py-3 justify-between items-center">
          <div className="flex gap-3 items-center">
            {iconComponent}
            <p className="text-slate-800 text-lg font-medium">{message}</p>
          </div>
          {status !== 'processing' && (
            <button 
              onClick={handleClose} 
              className="ml-4 h-8 w-8 rounded-sm bg-gray-500 flex items-center hover:opacity-50 justify-center text-slate-50"
            >
              &#x2715;
            </button>
          )}
        </div>
        {status !== 'processing' && (
          <div className="w-full bg-gray-300 rounded-bl-sm rounded-br-sm h-2 overflow-hidden relative">
            <div
              ref={progressBarRef}
              className="h-2"
              style={{
                width: '0%',
                height: '100%',
                maxHeight: '100%',
                background: 'linear-gradient(to left, green 50%, lightblue 50%) right',
                backgroundSize: '200%',
                transition: `width ${closeDuration / 1000}s ease-out`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;

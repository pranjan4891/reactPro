import React, { FC, useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { createGuest, getGuests } from "../../utils/http-requests";
import UpdateModal from './updateModal';
import styles from './guest.module.css';
import { GuestIface } from "../../types/Guest";
import { APIResponseIface } from "../../types/api-response";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setValidationErrors } from '../../store/slices/serverValidationError';
import Loader from "../../components/common/commonLoader";
import SkeletonListLoader from "../../components/common/SkeletonListLoader";
import FetchError from '../../components/common/FetchError';
import DataTable from './DataTable';
import { toast } from 'react-toastify';
import NoRecordFound from '../../components/common/NoRecordFound';
import { AxiosError } from 'axios';
import Pagination from '../../components/common/pagination/Pagination';
import { Link } from 'react-router-dom';

interface UpdateStatusInput {
  id: string;
  data: any;
}

const GuestList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit (items per page)
  const [search, setSearch] = useState(''); // Default limit (items per page)
  const validationErrors = useSelector((state: RootState) => state.serverValidationError.errors);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery<APIResponseIface, Error>({
    queryKey: ['pickupLocations', page, limit, status],
    queryFn: () => getGuests({ page, limit, search, status }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Refetch logic (for example, after a mutation or other success)
  const handleSuccess = () => {
    refetch(); // Refetch with the current page and limit
  };

  // Update page based on data.totalPages if user manually selects a larger page than available
  useEffect(() => {
    if (data?.total && page > data.total) {
      setPage(data.total);
    }
  }, [data?.total, page, status]);

  // Handle page change
  const handlePageChange = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected + 1);
    console.log(selectedPage.selected);
  };
  
  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  };

  const unsetGeneralError = () => setGeneralError(null);
  const openModal = () => {
    setIsModalOpen(true);
    unsetGeneralError();
  };
  const closeModal = () => setIsModalOpen(false);

  // Add new pickup location
  const saveMutation = useMutation({
    mutationFn: (newLocation: GuestIface) => {
      unsetGeneralError();
      return createGuest(newLocation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
      setIsModalOpen(false);
      unsetGeneralError();
      toast.success("Pickup Location Saved Successfully!", { autoClose: 1500 });
      refetch();
    },
    onError: (error: any) => {
      const errorData = error.response?.data;
      toast.error(errorData.msg, { autoClose: 2000 });
      if (errorData) {
        switch (errorData.remarks) {
          case 'VALIDATION_FAILED':
            setGeneralError(errorData.msg || 'Please check the fields and try again.');
            dispatch(setValidationErrors(errorData.errors));
            break;
          case 'SERVER_ERROR':
            setGeneralError('Server error, please try again.');
            break;
          case 'UNAUTHORIZED':
            setGeneralError(errorData.msg || 'Session expired, please log in again.');
            break;
          default:
            setGeneralError(errorData.msg || 'An error occurred while adding the location.');
        }
      } else {
        setGeneralError('Unexpected error occurred.');
      }
    },
  });


  // Handle adding a new location
  const addLocation = useCallback((newLocation: GuestIface) => {
    saveMutation.mutate(newLocation);
  }, [saveMutation]);

  // Render content based on query state
  const renderContent = () => {
    // Loading state
    if (isLoading) {
      return (
        <div className="h-full px-4 text-center">
          <h6 className="py-5 text-md font-md text-gray-400">Loading Guests, Please wait...</h6>
          <SkeletonListLoader count={10} />
        </div>
      );
    }

    // Error state
    if (isError) {
      const axiosError = error as AxiosError;
      return (
        <div className="text-center text-orange-500 mt-5">
          <div className="flex justify-center pt-20">
            {axiosError?.response?.status === 404 ? (
                <NoRecordFound onRefresh={refetch} />
            ) : (
              <FetchError message="Failed to fetch Guests." onRefresh={refetch} />
            )}
          </div>
        </div>
      );
    }

    // Data state - if data exists and is an array with length
    if (data?.data?.length) {
      return <DataTable locations={data.data} />;
    }

    // No data found
    return (
      <div className="text-center text-gray-500 mt-5">
        <NoRecordFound onRefresh={refetch} />
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col bg-white shadow-lg p-2 pt-0 overflow-x-hidden rounded-md overflow-y-auto">
      <Header total = {data?.total || 0} isLoading = {isLoading} openModal={openModal} />
      <div className="flex justify-center gap-5 p-1 bg-gray-100 h-full w-full shadow-inner rounded-sm z-0 border overflow-y-auto">
        <div className="flex flex-col h-full max-h-full overflow-y-auto w-full p-1">
          <div className={`flex-1 overflow-x-auto overflow-y-auto max-h-full bg-white h-full rounded-sm scroll-smooth ${saveMutation.isPending && 'blur-sm cursor-none'}`}>
            {renderContent()}
          </div>
          {data?.total && (
              <div className=' bg-white p-2 border-t-gray-800 flex items-center justify-between'>
                <div>
                  <strong>Total Records:</strong> <span>{data.total}</span>
                </div>
                <div className='flex gap-2'>
                  <div>
                    <Pagination
                      totalPages={Math.ceil(data?.total / limit || 1)}
                      // totalPages={Math.ceil(data?.total / limit || 1)}
                      onPageChange={handlePageChange}
                      limit={limit}
                      onLimitChange={handleLimitChange}
                    />
                    {/* Render orders data here */}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header: FC<{ openModal: () => void, total: number, isLoading:boolean}> = ({ openModal, total, isLoading }) => (
  <div className="flex py-1 justify-between items-center w-full">
    <h2 className="font-bold text-lg">
      <i className="ri-users-line"></i> Guests
    </h2>

    {!isLoading && (
    <div className="flex">
      {
        total > 0 && <SearchBar />
      }
      <Link to="/add-guest" className="h-10 px-5 flex items-center bg-cyan-500 shadow-sm rounded-md text-white hover:bg-cyan-600 text-sm">Add New Guest</Link>
    </div>
    )}
  </div>
);

// SearchBar Component
const SearchBar: FC = () => (
  <div className="relative mr-2">
    <label htmlFor="Search" className="sr-only">Search</label>
    <input
      type="text"
      id="Search"
      placeholder="Search for..."
      className={`${styles.input} h-10 w-full rounded-md border-gray-200 py-2 pe-16 shadow-sm sm:text-sm min-w-72`}
    />
    <button
      type="button"
      className="absolute text-gray-600 bg-slate-300 h-full rounded-l-sm hover:text-gray-700 top-0 px-3 right-0"
      style={{ top: '1px', right: '1px', borderRadius: '0 5px 5px 0', height: 'calc(100% - 2px)' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  </div>
);

export default GuestList;

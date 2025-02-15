import React, { FC, useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLocations, addLocation, updateLocation } from "../../utils/http-requests";
import UpdateModal from './updateModal';
import { LocationIface } from "../../types/typesLocation";
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

interface UpdateStatusInput {
    id: string;
    data: any;
}

const Location: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const validationErrors = useSelector((state: RootState) => state.serverValidationError.errors);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, refetch, isFetching, isPending } = useQuery<APIResponseIface, Error>({
        queryKey: ['location'],
        queryFn: getLocations,
    });

    const unsetGeneralError = () => setGeneralError(null);
    const openModal = () => {
        setIsModalOpen(true);
        unsetGeneralError();
    };
    const closeModal = () => setIsModalOpen(false);

    const updateStatus = (id: string, currentStatus: string) => {

        console.log(currentStatus);
        let newStatus
        if (currentStatus === 'ACTIVE') {
            newStatus = 'INACTIVE';
        } else if (currentStatus === 'INACTIVE') {
            newStatus = 'ACTIVE';
        } else {
            console.warn('Unknown status:', currentStatus);
            return; // Early exit if the status is neither ACTIVE nor INACTIVE
        }
        let data1: UpdateStatusInput = { id: id, data: { status: newStatus } }
        updateStatusMutation.mutate(data1);
    }

    const addLocationMutation = useMutation({
        mutationFn: (newLocation: LocationIface) => {
            unsetGeneralError();
            return addLocation(newLocation);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['locations'] });
            
            setIsModalOpen(false);
            unsetGeneralError();
            toast.success(" Location Saved Successfully!", { autoClose: 1500 });
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

    const updateStatusMutation: any = useMutation({
        mutationFn: (data1: UpdateStatusInput) => {
            const { id, data } = data1;
            console.log(id, data);
            return updateLocation(id, data); // Call your API function to update the status
        },
        onError: (error) => {
            toast.error(error.message, { autoClose: 2000 });
        },
        onSuccess: () => {
            toast.success("Status updated successfully!", { autoClose: 1500 });
            refetch();
        },
    });


    const addLocations = useCallback((newLocation: LocationIface) => {
        addLocationMutation.mutate(newLocation);
    }, [addLocationMutation]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="h-full px-4 text-center">
                    <h6 className="py-5 text-md font-md text-gray-400">Loading  Locations, Please wait...</h6>
                    <SkeletonListLoader count={10} />
                </div>
            );
        }

        if (isError || data?.httpStatusCode !== 200) {
            return (
                <div className="flex justify-center pt-20">
                    <FetchError message="Failed to fetch  Locations." onRefresh={refetch} />
                </div>
            );
        }

        return data && data.success ? (
            <>
                {data?.total ? (<DataTable locations={data.data} updateStatus={updateStatus} />) : <NoRecordFound onRefresh={refetch} />}
            </>

        ) :
            <div className="flex justify-center pt-20">
                <FetchError message="Failed to fetch  Locations." onRefresh={refetch} />
            </div>;

    };

    return (
        <div className="flex flex-1 flex-col bg-white shadow-lg p-2 pt-0 overflow-x-hidden rounded-md overflow-y-auto">
            <Header success={data?.success} openModal={openModal} />
            <div className="flex justify-center gap-5 p-1 bg-gray-100 h-full w-full shadow-inner rounded-sm z-0 border overflow-y-auto">
                <div className="flex flex-col h-full max-h-full overflow-y-auto w-full p-1">
                    <div className={`flex-1 overflow-x-auto overflow-y-auto max-h-full bg-white h-full rounded-sm scroll-smooth ${updateStatusMutation.isPending && 'blur-sm cursor-none'}`}>
                        {renderContent()}
                    </div>
                    {data?.total && (
                        <div className="bg-white p-2 border-t-gray-800 flex justify-between">
                            <div><strong>Total Records:</strong> <span>{data.total}</span></div>
                            <div></div>
                        </div>
                    )}
                </div>
            </div>

            <UpdateModal addLocations={addLocations} mutatePending={addLocationMutation.isPending} error={generalError} isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-lg font-bold">Custom Modal</h2>
                <p>This is a custom modal. You can place any content here.</p>
            </UpdateModal>
        </div>
    );
};

// Header Component
const Header: FC<{ openModal: () => void, success: boolean | undefined }> = ({ openModal, success }) => (
    <div className="flex py-1 justify-between items-center w-full">
        <h2 className="font-bold text-lg">
            <i className="ri-store-3-line"></i>  Locations
        </h2>
        {success && (
            <div className="flex">
                <SearchBar />
                <button
                    onClick={openModal}
                    className="h-10 px-5 flex items-center bg-cyan-500 shadow-sm rounded-md text-white hover:bg-cyan-600 text-sm"
                >
                    Add New Location
                </button>
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
            className={`h-10 w-full rounded-md border-gray-200 py-2 pe-16 shadow-sm sm:text-sm min-w-72`}
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

export default Location;
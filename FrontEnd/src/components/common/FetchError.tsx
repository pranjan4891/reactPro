import React from 'react';

interface FetchErrorProps {
    message: string;
    showRefresh?: boolean;
    onRefresh: () => void; // Function to handle refresh action
}

const FetchError: React.FC<FetchErrorProps> = ({ message, showRefresh = true, onRefresh }) => {
    return (
        <div className="px-2 text-center">
            <div className="flex items-center flex-col justify-center">
                <div>
                    <i className="ri-error-warning-line text-3xl text-red-600"></i>
                </div>
                <div>
                    <h5 className='text-red-300 text-lg font-bold'>{message}</h5>
                </div>
            </div>
            
            {showRefresh && (
                    <div className='mt-5'><button type="button" onClick={onRefresh} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 hover:text-wrap dark:focus:ring-purple-900 hover:text-white">Refresh</button>
                    </div>
            )}
        </div>
    );
};

export default FetchError;

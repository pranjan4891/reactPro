import React, {FC} from 'react'

interface LoaderProps {
    count: number;
    type?: string;
}
const SkeletonListLoader:FC <LoaderProps> = ({count, type}) => {
    return (        
        <div className="flex flex-col space-y-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={`skeleton ${type} h-5 bg-gray-200 animate-pulse rounded`} />
            ))}
        </div>
    );
}

export default SkeletonListLoader
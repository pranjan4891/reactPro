import React, { FC } from 'react';
import { VenueIface } from '../../types/typesVenue';

interface DataTableProps {
  VenueResponse: VenueIface[];
  updateStatus: (id: string, currentStatus:string) => void; // Ensure this matches the expected function signature
}

const DataTable: FC<DataTableProps> = ({ VenueResponse, updateStatus }) => {
  const headers = ['Name', 'Location', 'Start Date', 'End Date', 'Address'];

  return (
    <table className="min-w-full divide-y-2 divide-gray-200 rounded-sm bg-white text-gray-200 text-sm">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="bg-white px-4 py-2 font-medium text-left text-gray-900">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      { <tbody className="divide-y divide-gray-200">
        {VenueResponse.map(({ _id, venueName, location, address, startDate, endDate, status }) => (
          <tr key={_id}>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{venueName}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{location}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{startDate}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{endDate}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{address}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
             
              <label
  htmlFor={_id}
  className="relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
>
  <input
    type="checkbox"
    name={_id}
    id={_id}
    checked={status === "ACTIVE" }
    onChange={() => updateStatus(_id!, status!)}
    className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
  />

  <span
    className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-4 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
  >
    <svg
      data-unchecked-icon
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>

    <svg
      data-checked-icon
      xmlns="http://www.w3.org/2000/svg"
      className="hidden size-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </span>
</label>


            </td>
          </tr>
        ))}
      </tbody> }
    </table>
  );
}

export default DataTable;

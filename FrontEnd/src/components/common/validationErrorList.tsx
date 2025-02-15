import { useSelector, useDispatch } from 'react-redux';
import { clearValidationErrors } from '../../store/slices/serverValidationError';
import { RootState } from '../../store';
import { useEffect } from 'react';

type ValidationErrors = {
    [field: string]: string[]; // Each field can have multiple errors
};

const ValidationErrorList: React.FC = () => {
    const dispatch = useDispatch();
    const validationErrors = useSelector((state: RootState) => state.serverValidationError.errors) as ValidationErrors; // Use the correct type for validationErrors

    
    // Log the validation errors in console to verify
    useEffect(() => {
        console.log('Validation Errors:', validationErrors);
    }, [validationErrors]);

    // Clear errors on button click
    const clearErrors = () => {
        dispatch(clearValidationErrors());
    };

    // If no validation errors exist, don't render the component
    if (!validationErrors || Object.keys(validationErrors).length === 0) {
        return null;
    }

  return (
    <div style={{ display: Object.keys(validationErrors).length > 0 ? "block" : "none" }}>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="font-bold text-lg">Validation Failed</h2>
          <h3>Please Check the Form</h3>
        </div>
        <div
          className="btn btn-md bg-red-300 cursor-pointer"
          onClick={clearErrors} // Close the error list on click
        >
          X
        </div>
      </div>
      <div className="bg-red-200 p-2 mb-10 rounded-md">
        <ul className="list-disc list-inside">
          {Object.keys(validationErrors).map((field) => (
            <li key={field} className="mb-2 border-b border-red-400 pb-1">
              <strong className="text-md">{field}:</strong>
              <ul className="ml-5">
                {validationErrors[field].map((error, index) => (
                  <li key={index} className="text-red-500 text-sm ">
                    {error}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ValidationErrorList;

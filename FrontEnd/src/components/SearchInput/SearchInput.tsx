import React, { useState, useCallback, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

interface SearchInputProps {
  placeholder: string;
  searchTerm: string;
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ placeholder, searchTerm, onSearch }) => {
    const [searchValue, setSearchValue] = useState(searchTerm);

    // Handle input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    };

    // Log search value on mount
    useEffect(() => {
      console.log("mounted location searchValue => ", searchValue);
    }, [searchValue]); // Add searchValue to dependency array

    // Memoized search click handler
    const handleSearchClick = useCallback(() => {
      if (searchValue.trim()) {
        onSearch(searchValue.trim());
      }
    }, [searchValue, onSearch]);

    // Memoized enter key press handler
    const handleKeyPress = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent form submission
          handleSearchClick();
        }
      },
      [handleSearchClick]
    );

    // Memoized clear search handler
    const handleClearSearch = useCallback(() => {
      setSearchValue(""); // Clear input field
      onSearch(""); // Notify parent to clear search
    }, [onSearch]);

    // Memoized blur handler
    const handleBlur = useCallback(() => {
      if (searchValue.trim() === "") {
        onSearch(""); // Reset all data if input is empty
      }
    }, [searchValue, onSearch]);

    return (
      <InputGroup>
        <Form.Control
          placeholder={placeholder}
          aria-label="Search"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur} // Add blur event handler
          style={{ minWidth: "250px", maxWidth: "100%" }}
        />
        {searchValue && (
          <Button variant="outline-secondary" onClick={handleClearSearch}>
            <i className="ri-close-line"></i>
          </Button>
        )}
        <Button variant="success" onClick={handleSearchClick}>
          <i className="ri-search-line"></i>
        </Button>
      </InputGroup>
    );
  }
);

export default SearchInput;

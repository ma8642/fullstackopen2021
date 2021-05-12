import React from "react";

const FilterSearch = ({ input, handleChange }) => {
  return (
    <div>
      <label htmlFor="filter">find countries </label>
      <input value={input} onChange={handleChange} name="filter" />
    </div>
  );
};

export default FilterSearch;

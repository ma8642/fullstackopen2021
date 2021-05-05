import React from "react";

const Filter = ({ filter, handleChange }) => {
  return (
    <div id="filter-div">
      <label for="filter">filter shown with </label>
      <input name="filter" value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;

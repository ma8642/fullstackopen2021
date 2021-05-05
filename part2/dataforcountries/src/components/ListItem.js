import React from "react";

const ListItem = ({ name, handleClick }) => {
  return (
    <p>
      {name} <button onClick={handleClick}>show country</button>
    </p>
  );
};

export default ListItem;

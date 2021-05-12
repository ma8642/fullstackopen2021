import React from "react";

const Person = ({ person, handleClick }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={handleClick}>delete</button>
    </p>
  );
};

export default Person;

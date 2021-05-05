import React from "react";

const Country = ({ name, capital, population, languages, flag }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>captial {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={flag} alt={`Flag of ${name}`} style={{ width: "100%" }} />
    </div>
  );
};

export default Country;

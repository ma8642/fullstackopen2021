import React, { useState, useEffect } from "react";
import FilterSearch from "./components/FilterSearch";
import Country from "./components/Country";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");
    setInput(event.target.value);
    if (event.target.value.length > 0) {
      // don't search when input="", i.e. user deleted all text
      axios
        .get(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
        .then((response) => {
          if (response.data.length === 1) {
            setCountries(response.data);
          } else {
            setCountries(response.data);
          }
        })
        .catch((error) => setError("Not found!  Try another search."));
    }
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const countryNames = response.data.map((country) => country.name);
      setCountries(countryNames);
    });
  }, []);

  return (
    <div>
      <FilterSearch input={input} handleChange={handleChange} />
      {
        error.length > 0 ? (
          <p>{error}</p>
        ) : countries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countries.length > 1 ? (
          countries.map((country) => <p key={country.name}>{country.name}</p>)
        ) : countries.length === 1 ? (
          <Country
            key={countries[0].name}
            name={countries[0].name}
            capital={countries[0].capital}
            population={countries[0].population}
            languages={countries[0].languages}
            flag={countries[0].flag}
          />
        ) : (
          <p>Loading...</p>
        )
        // <Country key={countries[0].name} country={countries[0]} />
      }
    </div>
  );
}

export default App;

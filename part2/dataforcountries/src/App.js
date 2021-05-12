import React, { useState, useEffect } from "react";
import FilterSearch from "./components/FilterSearch";
import Country from "./components/Country";
import ListItem from "./components/ListItem";
import axios from "axios";

function App() {
  const openWeatherApiKey = process.env.REACT_APP_API_KEY;
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");
  const [showCountry, setShowCountry] = useState({});
  const [weather, setWeather] = useState({});

  const getWeatherInCapital = (country) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${openWeatherApiKey}&units=metric`
      )
      .then((response) =>
        setWeather({
          temp: response.data.main.temp,
          descr: response.data.weather[0].description,
          wind: response.data.wind.speed,
        })
      );
  };

  const handleChange = (event) => {
    // filter countries as user types
    setError("");
    setShowCountry({});
    setWeather({});
    setInput(event.target.value);
    if (event.target.value.length > 0) {
      // don't search when input="", i.e. user deleted all text
      axios
        .get(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
        .then((response) => {
          if (response.data.length === 1) {
            setCountries(response.data);
            getWeatherInCapital(response.data[0]);
          } else {
            setCountries(response.data);
          }
        })
        .catch((error) => setError("Not found!  Try another search."));
    }
  };

  const handleClick = (country) => {
    // display whatever country user clicks
    getWeatherInCapital(country);
    setShowCountry(country);
  };

  useEffect(() => {
    // pre-populate countries list with ALL countries
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const countryNames = response.data.map((country) => country.name);
      setCountries(countryNames);
    });
  }, []);

  return (
    <div>
      <FilterSearch input={input} handleChange={handleChange} />
      {error.length > 0 ? (
        <p>{error}</p>
      ) : countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length > 1 ? (
        <div>
          {countries.map((country) => (
            <ListItem
              key={country.name}
              name={country.name}
              handleClick={() => handleClick(country)}
            />
          ))}
          <div>
            {Object.keys(showCountry).length > 0 ? (
              <Country
                name={showCountry.name}
                capital={showCountry.capital}
                population={showCountry.population}
                languages={showCountry.languages}
                flag={showCountry.flag}
                weather={weather}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : countries.length === 1 ? (
        <Country
          key={countries[0].name}
          name={countries[0].name}
          capital={countries[0].capital}
          population={countries[0].population}
          languages={countries[0].languages}
          flag={countries[0].flag}
          weather={weather}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

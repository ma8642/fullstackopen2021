import React from "react";

const Weather = ({ capital, weather }) => {
  return (
    <div>
      {Object.keys(weather).length > 0 ? (
        <>
          <p>temperature: {weather.temp} Celcius</p>
          <p>description: {weather.descr}</p>
          <p>wind: {weather.wind}</p>
        </>
      ) : (
        <>
          <p>temperature: Loading...</p>
          <p>description: Loading...</p>
          <p>wind: Loading...</p>
        </>
      )}
    </div>
  );
};

export default Weather;

import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital?.[0]}&appid=${api_key}&units=metric`,
      )
      .then((response) => {
        // console.log(response.data);

        setWeather(response.data);
      });
  }, [country]);
  console.log(weather);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />

      <h2>Weather in {country.capital[0]}</h2>
      {weather && (
        <div>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;

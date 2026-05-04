import axios from "axios";
import { useEffect, useState } from "react";
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });

    // const api_key = import.meta.env.VITE_SOME_KEY;
    // axios
    //   .get(`https://api.openweathermap.org/data/3.0/onecall?appid=${api_key}`)
    //   .then((response) => console.log(response.data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  const countriesToShow =
    filter === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase()),
        );

  let content = null;
  if (selectedCountry) {
    content = <CountryDetails country={selectedCountry} />;
  } else if (countriesToShow.length > 10) {
    content = <p>too many matches, specify another filter</p>;
  } else if (countriesToShow.length > 1) {
    content = (
      <CountryList countries={countriesToShow} onSelect={setSelectedCountry} />
    );
  } else if (countriesToShow.length === 1) {
    content = <CountryDetails country={countriesToShow[0]} />;
  } else if (countriesToShow.length === 0 && filter !== "") {
    content = <p>no matches found</p>;
  }

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {content}
    </>
  );
}

export default App;


import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const apiKey = 'a7fc04e63ee2d134cc8ef805ebb4e899'; // Read API key from .env file

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = (event) => {

    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);
      })
      setLocation('');
    }
  }
  return (
    <>
      <div className="app">
        <div className="search">
          <input className="input"
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder="Location"
            onKeyPress={searchLocation}
            type="text" />

        </div>


        <div className="container">
          <div className="top">
            <div className="location">
              <p className="bold">{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()} °C </h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p className="bold">{data.weather[0].main}</p> : null}
            </div>
          </div>

{data.name !== undefined &&
          <div className="bottom">
          <div className="feels">
            {data.main ?<p className="bold">{data.main.feels_like.toFixed()} °C</p> : <p>-</p>}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}</p> : <p>-</p> }
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed}</p> : <p>-</p>}
            <p>Wind</p>
          </div>
        </div>
}


        </div>

      </div>
    </>
  );
}

export default App;

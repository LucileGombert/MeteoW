import './App.css';
import React, { useState } from 'react';  
import Logo from "./components/Logo";
// import Home from './pages/Home';

// background en fonction du temps

// ville par défaut rodez
// plusieurs jours

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=0a9c6fb7410b7e7a62dfa930f6c55777`)
    .then((response) => response.json())
    .then(result => {
      setWeather(result)
      setCity('');
      console.log('resultat', result.main);
    });
  }
 
  return (
    <div className="app">
      <Logo/>
      <main>
        {/* <Home/> */}
        <div className="searchBox">
          <input type="text" placeholder="Rechercher ..." className="searchBar" onChange={e => setCity(e.target.value)} value={city}/>
          
          <div onClick={search}>
            <svg xmlns="http://www.w3.org/2000/svg" class="searchIcon h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="globalWeather">
              <img className="weatherIcon"  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
              
              <div>
                <p className="weatherCity">{weather.name}, {weather.sys.country}</p>
                <p className="weatherTemp">{(weather.main.temp).toFixed(1)} °C</p>
                <p className="weatherDesc">{weather.weather[0].description}</p>
              </div>
            </div>

            <div className="infoWeather">
              <div className="bloc">
                <p>Température min. : {(weather.main.temp_min).toFixed(1)} °C</p>
                <p>Température max. : {(weather.main.temp_max).toFixed(1)} °C</p>
                <p>Humidité : {weather.main.humidity} %</p>
                <p>Vent : {(weather.wind.speed* 3.6).toFixed(1)} km/h</p>
              </div>
              
            </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );  
}

export default App;

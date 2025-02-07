import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import cloud_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [WeatherData, setWeatherData] = useState(false);
  // icons
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  // calling the openweather api
  async function search(city) {
    if (city === "") {
      alert("Enter the city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message)
        return;
        
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false)
      console.error(error);
    }
  }
  useEffect(() => {
    search("mumbai");
  }, []);
  // The UI for the weather app
  return (
    <div className="weather">
      <div className="search">
        <input ref={inputRef} type="text" placeholder="search" />
        <img
          src={search_icon}
          alt="search png"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {WeatherData ? 
        <>
          <img
            src={WeatherData.icon}
            alt="clear icon"
            className="weather-icon"
          />
          <p className="temperature">{WeatherData.temperature}°C</p>
          <p className="location">{WeatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity-icon" />
              <div>
                <p>{WeatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind-icon" />
              <div>
                <p>{WeatherData.windspeed}km/h</p>
                <span>wind speed</span>
              </div>
            </div>
          </div>
          <p className="footer">©weather app done by vinoth</p>
        </>
       : 
        <></>
      }
    </div>
  );
};

export default Weather;

import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import cloud_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

// Background images for different weather conditions
import clear_bg from "../assets/clear_bg2.jpg";
import rain_bg from "../assets/rain_bg.jpg";
import cloud_bg from "../assets/cloud_bg2.jpg";
import snow_bg from "../assets/snow_bg2.jpeg";

const Weather = () => {
  const inputRef = useRef();
  const [WeatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState(clear_bg); // Default background

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
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const allBackgrounds = {
    "01d": clear_bg,
    "01n": clear_bg,
    "02d": cloud_bg,
    "02n": cloud_bg,
    "03d": cloud_bg,
    "03n": cloud_bg,
    "04d": cloud_bg,
    "04n": cloud_bg,
    "09d": rain_bg,
    "09n": rain_bg,
    "10d": rain_bg,
    "10n": rain_bg,
    "13d": snow_bg,
    "13n": snow_bg,
  };

  async function search(city) {
    if (city === "") {
      alert("Enter the city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_ID
      }`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      const bg = allBackgrounds[data.weather[0].icon] || clear_bg;

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      setBackground(bg);
    } catch (error) {
      setWeatherData(null);
      console.error(error);
    }
  }

  useEffect(() => {
    search("Mumbai");
  }, []);

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background 0.5s ease-in-out",
      }}
    >
      <div className="weather p-4 text-center">
        <div className="search d-flex align-items-center">
          <input
            ref={inputRef}
            type="text"
            className="form-control me-2"
            placeholder="Enter city"
          />
          <img
            src={search_icon}
            alt="search icon"
            onClick={() => search(inputRef.current.value)}
          />
        </div>

        {WeatherData ? (
          <>
            <img
              src={WeatherData.icon}
              alt="weather icon"
              className="weather-icon"
            />
            <h2 className="temperature">{WeatherData.temperature}°C</h2>
            <h3 className="location">{WeatherData.location}</h3>

            <div className="row mt-4 text-white">
              <div className="col-6 d-flex align-items-center justify-content-center">
                <img src={humidity_icon} alt="humidity-icon" width="24px" />
                <div className="ms-2">
                  <p className="mb-0 text-white">{WeatherData.humidity}%</p>
                  <small className="text-white">Humidity</small>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-center">
                <img src={wind_icon} alt="wind-icon" width="24px" />
                <div className="ms-2">
                  <p className="mb-0">{WeatherData.windspeed} km/h</p>
                  <small>Wind Speed</small>
                </div>
              </div>
            </div>

            <p className="footer mt-3">© Weather App by Vinoth</p>
          </>
        ) : (
          <p className="text-white mt-4">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;

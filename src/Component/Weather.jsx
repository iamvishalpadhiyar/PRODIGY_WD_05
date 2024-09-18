import React, { useEffect, useState } from 'react';
import './Weather.css';
import 'https://kit.fontawesome.com/3482424e3c.js';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const [city, setCity] = useState('Surat');

    const search = async (city) => {
        if (city === "") {
            alert("Enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert("Enter correct city name");
                return;
            }

            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            });
        }
        catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather data", error);
        }
    };

    useEffect(() => {
        search(city);
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            search(city);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="navbar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    <i className="fa-solid fa-magnifying-glass" onClick={() => search(city)}></i>
                </div>
                {
                    weatherData ?
                    <>
                        <div className="icons">
                            <img src={weatherData.icon} alt="Weather icon" className="weather-icon" />
                        </div>
                        <p className="temperature">{weatherData.temperature}°C</p>
                        <p className="location">{weatherData.location}</p>
                        <div className="weather-data">
                            <div className="col">
                                <i className="fa-solid fa-water"></i>
                                <div>
                                    <p>{weatherData.humidity}%</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className="col">
                                <i className="fa-solid fa-wind"></i>
                                <div>
                                    <p>{weatherData.windSpeed} Km/h</p>
                                    <span>Wind Speed</span>
                                </div>
                            </div>
                        </div>
                    </> :
                    <></>
                }
            </div>
        </div>
    );
};

export default Weather;

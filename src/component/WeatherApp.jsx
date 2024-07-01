import React, { useEffect, useState } from "react";

function WeatherApp() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeatherData = () => {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4689a06710d7b8ac9cb36dee6bb06c22`)
                    .then(response => response.json())
                    .then(result => {
                        const temperatureCelsius = result.main.temp - 273.15;
                        result.main.temp = temperatureCelsius;
                        setWeather(result.main);
                    })
                    .catch(error => {
                        console.error("Error By Fetching weather Data: ", error);
                    });
        };
        fetchWeatherData();
    }, [search]);

    return (
        <>
            <div className="WeatherApp">
                <div className="WeatherUpdate">
                    <h1>Weather:</h1>
                    <input type="text" placeholder="Enter City Name" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    {weather && (
                        <div className="UpdateWeather">
                            <p>Temperature: {weather.temp.toFixed(2)}°C</p>
                            <p>Temp_max: {weather.temp_max}</p>
                            <p>Temp_min: {weather.temp_min}</p>
                            <p>Humidity: {weather.humidity}</p>
                            <p>Pressure: {weather.pressure}</p>
                            <p>Feels_like: {weather.feels_like}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default WeatherApp;
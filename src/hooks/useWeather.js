import {useEffect, useState, useContext} from "react";
import {LocationContext} from "../context/index.js";

const useWeather = () => {

    const [weatherData, setWeatherData] = useState({
        location: '',
        climate: '',
        temperature: '',
        maxTemperature: '',
        minTemperature: '',
        humidity: '',
        cloudPercentage: '',
        wind: '',
        time: '',
        latitude: '',
        longitude: '',
    });
    const [loading, setLoading] = useState({
        state: false,
        message: '',
    });
    const [error, setError] = useState(null);
    const {selectedLocation} = useContext(LocationContext);

    const fetchWeatherData = async (latitude, longitude) => {
        try {
            setLoading({
                ...loading,
                state: true,
                message: "Fetching weather data ..."
            });

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);

            if (!response.ok) {
                throw new Error(`Fetching weather data failed: ${response.status}`);
            }

            const data = await response.json();

            const updateWeatherData = {
                ...weatherData,
                location: data?.name,
                climate: data?.weather[0]?.main,
                temperature: data?.main?.temp,
                maxTemperature: data?.main?.temp_max,
                minTemperature: data?.main?.temp_min,
                humidity: data?.main?.humidity,
                cloudPercentage: data?.clouds?.all,
                wind: data?.wind?.speed,
                time: data?.dt,
                latitude: latitude,
                longitude: longitude,
            };
            setWeatherData(updateWeatherData);

        } catch (error) {
            setError(error);
        } finally {
            setLoading({
                ...loading,
                state: false,
                message: ""
            });
        }
    }

    useEffect(() => {
        setLoading({
            ...loading,
            state: true,
            message: "Fetching Location ..."
        });

        if (selectedLocation.latitude && selectedLocation.longitude) {
            fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude);

        } else {
            navigator.geolocation.getCurrentPosition(function (position) {
                fetchWeatherData(position.coords.latitude, position.coords.longitude);
            })
        }
    }, [selectedLocation.latitude, selectedLocation.longitude]);

    return {
        weatherData,
        error,
        loading,
    }

}

export default useWeather;
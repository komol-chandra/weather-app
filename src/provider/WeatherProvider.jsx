import {WeatherContext} from "../context/index.js";
import {useWeather} from "../hooks/index.js";

const WeatherProvider = ({children})=>{
    const{weatherData,error,loading} = useWeather();
    return(
        <WeatherContext.Provider value={{weatherData,error,loading}}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherProvider
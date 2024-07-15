import './App.css'
import {WeatherProvider, FavouriteProvider, LocationProvider} from "./provider/index.js";
import Page from "./Page.jsx";

function App() {
    return (
        <LocationProvider>
            <WeatherProvider>
                <FavouriteProvider>
                    <Page/>
                </FavouriteProvider>
            </WeatherProvider>
        </LocationProvider>
    )
}

export default App

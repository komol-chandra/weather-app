import HeartImage from "../../assets/heart.svg";
import RedHeartImage from "../../assets/heart-red.svg";
import {useContext, useEffect, useState} from "react";
import {FavouriteContext, WeatherContext} from "../../context/index.js";

function AddToFavourite() {
    const {addToFavourites, removeFromFavourites, favourites} = useContext(FavouriteContext);
    const {weatherData} = useContext(WeatherContext);
    const {latitude, longitude, location} = weatherData;
    const [isFavourite, toggleFavourite] = useState(false);

    useEffect(()=>{
        const found = favourites.find((fav)=>fav.location===location);
        toggleFavourite(found);
    },[])


    const handleFavourites = () => {
        const found = favourites.find((fav) => fav.location === location);
        if (!found) {
            addToFavourites(latitude, longitude, location);
        } else {
            removeFromFavourites(location);
        }
        toggleFavourite(!isFavourite);
    }

    return (
        <div className="md:col-span-2">
            <div className="flex items-center justify-end space-x-6">
                <button
                    onClick={handleFavourites}

                    className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]">
                    <span>Add to Favourite</span>
                    <img src={isFavourite ? RedHeartImage : HeartImage} alt=""/>
                </button>

            </div>
        </div>
    )
}

export default AddToFavourite
import SearchImage from '../../assets/search.svg'
import {useContext} from "react";
import {LocationContext} from "../../context/index.js";
import {getLocationByName} from "../../data/location-data.js";
import {useDebounce} from "../../hooks/index.js";

function Search() {
    const {setSelectedLocation} = useContext(LocationContext);

    const doSearch = useDebounce((term)=>{
        const fetchedLocation = getLocationByName(term);
        setSelectedLocation({...fetchedLocation});
    },500);
    const handleChange = (e)=>{
        doSearch(e.target.value);
    };
    return (
        <form action="#" >
            <div
                className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-black/30 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
                <input
                    onChange={handleChange}
                    className="bg-transparent  placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
                    type="search" placeholder="Search Location" required/>
                {/*<button type="submit">*/}
                {/*    <img alt='search' src={SearchImage}/>*/}
                {/*</button>*/}
            </div>
        </form>
    );
}

export default Search;
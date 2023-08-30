import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './AllSpots.css';
import { getLoadedSpots } from '../../store/spots';

function AllSpots () {
    const dispatch = useDispatch();
    const selectAllSpots = useSelector(state => state.spots);
    console.log(selectAllSpots)
    const objAllSpots = Object.values(selectAllSpots);


    useEffect(() => {
        dispatch(getLoadedSpots())
    }, [dispatch]);

    if (!objAllSpots.length) {
        return null;
    }
console.log(objAllSpots)
    return (
        <div className="spots-container">
            {objAllSpots.map(spot => (
                <div key={`${spot.name}`} className='spot'>
                    <div className='image'><img src={spot.previewImage} alt='spotImg' /></div>
                    <span className='name'>{spot.name}</span>

                    <div className='first-row'>
                        <span className='cityState'>
                            {spot.city}, {spot.state}
                        </span>

                        <span className='ratings'><i class="fa-solid fa-star"></i>{spot.avgRating}
                        </span>
                    </div>
                    <span className='price'>${spot.price}/night</span>
                </div>
            ))}
        </div>
    )


}

export default AllSpots;

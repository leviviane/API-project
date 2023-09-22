import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/";
import { getSingleSpotThunk } from "../../store/spots";
import './SingleSpotDetails.css';

function SingleSpotDetails () {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.singleSpot)
    const {spotId} = useParams();

    useEffect(() => {
        dispatch(getSingleSpotThunk(spotId));
    }, [dispatch, spotId])

    if (!spot || Object.keys(spot).length === 0) {
        return null;
    }
    console.log('spot:', spot)

    return (
        <div id='spots-details-container'>
            <div className='name-location-container'>
                <h2>{spot.name}</h2>
                <h4>{`${spot.city}, ${spot.state}, ${spot.country}`}</h4>
            </div>
            <div className='image-container'>
                
            </div>
        </div>
    )
}


export default SingleSpotDetails;

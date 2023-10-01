import React from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotsThunk } from '../../store/spots';
import './AllSpots.css';

function SpotsLandingPage() {
  const dispatch = useDispatch();

  //selects store data objects
  const selectAllSpots = useSelector(state => state.spots.allSpots);
  const objAllSpots = Object.values(selectAllSpots);
  // console.log('objAllSpots: ', objAllSpots)

  useEffect(() => {
    dispatch(getSpotsThunk())
  }, [dispatch]);

  if (!objAllSpots.length || !objAllSpots) {
    console.log('entered')
    dispatch(getSpotsThunk())
    return null;
  }
  console.log('objAllSpots:', objAllSpots)

  return (
    <div className="spots-container">
      {objAllSpots.map(spot => (
        <NavLink to={`/spot/${spot.id}`} key={spot.id} className='spot-title'>
          <div key={spot.id} className='spot'>
            <div className='image'><img src={spot.previewImage} alt='spotImg' /></div>
            <div className='details'>
              <h3 className='spot-name'>{spot.name}</h3>
              <span className='cityState'>{spot.city}, {spot.state}</span>
              <span className='price'>${spot.price}/night</span>
            </div>
            <div className="right-side-ratings">
            <span className='ratings'><i className="fa-solid fa-star"></i>{spot.avgRating}</span>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default SpotsLandingPage;

import React from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './AllSpots.css';
import { getLoadedSpotsThunk } from '../../store/spots';

function AllSpots() {
  const dispatch = useDispatch();
  const selectAllSpots = useSelector(state => state.spots);
  const objAllSpots = Object.values(selectAllSpots);

  useEffect(() => {
    dispatch(getLoadedSpotsThunk())
  }, [dispatch]);

  return (
    <div className="spots-container">
      {objAllSpots.map(spot => (
        <NavLink to={`/spot/${spot.id}`} key={spot.id} className='spot-title'>
          <div key={spot.id} className='spot'>
            <div className='image'><img src={spot.previewImage} alt='spotImg' /></div>
            <div className='details'>
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

export default AllSpots;

// import React from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { createSpot } from '../../store/spots';
// import './SpotDetails.css';

// function spotDetails({spot}) {
//     return (
//         <div className='spots-detail-container'>
//             {spot.map((spots) =>(
//                 <Link to={`/spot/${spots.id}`} key={spots.id} className='spot-title'>
//                     <div className='image-container'>
//                         <img src={spot.name} className='spot-image' src={spot.previewImage} alt='' />
//                     </div>
//                 </Link>
//             ))}

//                 <div className='spot-details'>
//                     <div>
//                     <p className='spot-location'>{spot.city}, {spot.state}</p>
//                     <p className='spot-price'>${spot.price} night</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default spotDetails;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import './SpotDetail.css';

function SpotDetailPage({ match }) {
  const dispatch = useDispatch();
  const spotId = match.params.id;
  useEffect(() => {
    dispatch(getSpotDetails(spotId));
  }, [dispatch, spotId]);

  const oneSpot = useSelector((state) => state.spots.oneSpot);

  return (
    <div className='spot-detail-container'>
        {spots.map((spot) => (
            <Link to={`/spot/${spot.id}`} key={spot.id} className='spot-title'>
                <div className='image-container'>
                    <img src={`/public/${spot.id}`} className='spot-image' src={spot.previewImage} alt='' />
                    <div className='spot-detail'>
                        <div className='spot-name'>
                            {spot.name}
                        </div>
                        <div className='spot-location'>
                            {spot.city}, {spot.state}, {spot.country}
                        </div>
                        <div className='spot-price'>
                            ${spot.price} / night
                        </div>
                        <div className='spot-review'>
                            <i class="fa-solid fa-star"></i>{spot.avgRating}
                        </div>
                        <div className='spot-host'>
                            <p>Hosted by {oneSpot.firstName} {oneSpot.lastName}</p>
                        </div>
                        <div className='spot-description'>
                            <p>{oneSpot.review}</p>
                        </div>
                        <div className='info-box'>
                            {oneSpot.callout}
                        </div>
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default SpotDetailPage;

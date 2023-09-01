import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetailsThunk } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './SpotDetails.css';

function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot || Object.keys(spot).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='spot-detail-container'>
      <div className='image-container'>
        <img className='spot-image' src={spot.previewImage} alt='' />
        <div className='spot-detail'>
          <div className='spot-name'>{spot.name}</div>
          <div className='spot-location'>
            {spot.city}, {spot.state}, {spot.country}
          </div>
          <div className='spot-price'>${spot.price} / night</div>
          <div className='spot-review'>
            <i className='fa-solid fa-star'></i>
            {spot.avgRating}
          </div>
          <div className='spot-host'>
            <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
          </div>
          <div className='spot-description'>
            <p>{spot.describe}</p>
          </div>
          <div className='info-box'>{spot.callout}</div>
        </div>
      </div>
    </div>
  );
}

export default SpotDetails;



// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSpotDetailsThunk } from '../../store/spots';
// import { useParams } from 'react-router-dom';
// import './SpotDetails.css';


// function SpotDetails() {
//   const dispatch = useDispatch();
//   const { spotId } = useParams;
//   const spot = useSelector((state) => state.spot.singleSpot);

//   useEffect(() => {
//     dispatch(getSpotDetailsThunk(spotId));
//   }, [dispatch, spotId]);

//   if (!spot || Object.keys(spot).length === 0) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className='spot-detail-container'>
//       <div className='image-container'>
//         <img className='spot-image' src={spotId.previewImage} alt='' />
//         <div className='spot-detail'>
//           <div className='spot-name'>{spot.name}</div>
//           <div className='spot-location'>
//             {spot.city}, {spot.state}, {spot.country}
//           </div>
//           <div className='spot-price'>${spot.price} / night</div>
//           <div className='spot-review'>
//             <i className='fa-solid fa-star'></i>
//             {spot.avgRating}
//           </div>
//           <div className='spot-host'>
//             <p>Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName} </p>
//           </div>
//           <div className='spot-description'>
//             <p>{spot.review}</p>
//           </div>
//           <div className='info-box'>{spot.callout}</div>
//         </div>
//       </div>
//     </div>
//   );
// }




// export default SpotDetails;


// import React from 'react';
// import Route, { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from "react";
// import './SpotDetail.css';
// import { getSpotDetails } from '../../store/spots';
// import { useParams } from 'react-router-dom';

// function SpotDetails() {
//   const dispatch = useDispatch();
//   const { spotId } = useParams();
//   const oneSpot = useSelector((state) => state.spots.oneSpot);


//   useEffect(() => {
//     dispatch(getSpotDetails(spotId));
//   }, [dispatch, spotId]);


//   return (
//     <div className='spot-detail-container'>
//         {spots.map((spot) => (
//             <NavLink to={`/spot/${spot.id}`} key={spot.id} className='spot-title'>
//                 <div className='image-container'>
//                     <img key={`/public/${spot.id}`} className='spot-image' src={spot.previewImage} alt='' />
//                     <div className='spot-detail'>
//                         <div className='spot-name'>
//                             {spot.name}
//                         </div>
//                         <div className='spot-location'>
//                             {spot.city}, {spot.state}, {spot.country}
//                         </div>
//                         <div className='spot-price'>
//                             ${spot.price} / night
//                         </div>
//                         <div className='spot-review'>
//                             <i class="fa-solid fa-star"></i>{spot.avgRating}
//                         </div>
//                         <div className='spot-host'>
//                             <p>Hosted by {oneSpot.firstName} {oneSpot.lastName}</p>
//                         </div>
//                         <div className='spot-description'>
//                             <p>{oneSpot.review}</p>
//                         </div>
//                         <div className='info-box'>
//                             {oneSpot.callout}
//                         </div>
//                     </div>
//                 </div>
//             </NavLink>
//         ))}
//     </div>
//   )
// }

// export default SpotDetails;




// import React, { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSpotDetails } from '../../store/spots';
// import { useParams } from 'react-router-dom';

// function SpotDetails() {
//   const dispatch = useDispatch();
//   const { spotId } = useParams();
//   const oneSpot = useSelector((state) => state.spots.oneSpot);

//   useEffect(() => {
//     dispatch(getSpotDetails(spotId));
//   }, [dispatch, spotId]);

//   const spots = oneSpot.spots;

//   return (
//     <div className='spot-detail-container'>
//       {spots.map((spot) => (
//         <NavLink to={`/spot/${spot.id}`} key={spot.id} className='spot-title'>
//           <div className='image-container'>
//             <img
//               key={`/public/${spot.id}`}
//               className='spot-image'
//               src={spot.previewImage}
//               alt=''
//             />
//             <div className='spot-detail'>
//               <div className='spot-name'>{spot.name}</div>
//               <div className='spot-location'>
//                 {spot.city}, {spot.state}, {spot.country}
//               </div>
//               <div className='spot-price'>${spot.price} / night</div>
//               <div className='spot-review'>
//                 <i className="fa-solid fa-star"></i>{spot.avgRating}
//               </div>
//               <div className='spot-review'>
//                             <i class="fa-solid fa-star"></i>{spot.avgRating}
//                         </div>
                        // <div className='spot-host'>
                        //     <p>Hosted by {oneSpot.firstName} {oneSpot.lastName}</p>
                        // </div>
                        // <div className='spot-description'>
                        //     <p>{oneSpot.review}</p>
                        // </div>
                        // <div className='info-box'>
                        //     {oneSpot.callout}
                        // </div>
//             </div>
//           </div>
//         </NavLink>
//       ))}
//     </div>
//   );
// }

// export default SpotDetails;

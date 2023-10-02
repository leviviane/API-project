import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpotsThunk } from '../../store/spots';
import './AllSpots.css';

function SpotsLandingPage() {
  const dispatch = useDispatch();

  const selectAllSpots = useSelector((state) => state.spots.allSpots);
  const objAllSpots = Object.values(selectAllSpots);

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  if (!objAllSpots.length || !objAllSpots) {
    console.log('entered');
    dispatch(getSpotsThunk());
    return null;
  }

  return (
    <div className='spots-container'>
      {objAllSpots.map((spot) => (
        <NavLink to={`/spot/${spot.id}`} key={spot.id} className='spot-title'>
          <div key={spot.id} className='spot'>
            <div className='image'>
              <img src={spot.previewImage} alt='spotImg' title={spot.name} />
            </div>
            <div className='details'>
              <span className='cityState'>
                {spot.city}, {spot.state}
              </span>
              <div className='right-side-ratings'>
                <span className='ratings'>
                  <i className='fa-solid fa-star'></i>
                  {spot.avgRating !== null
                    ? spot.avgRating.toFixed(1)
                    : 'New'}
                </span>
              </div>
            </div>
            <div className='right-details'>
              {/* <h3 className='spot-name'>{spot.name}</h3> */}
              <span className='price'>${spot.price}/night</span>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default SpotsLandingPage;



// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getSpotsThunk } from '../../store/spots';
// import './AllSpots.css';

// function SpotsLandingPage() {
//   const dispatch = useDispatch();

//   // Selects store data objects
//   const selectAllSpots = useSelector(state => state.spots.allSpots);
//   const objAllSpots = Object.values(selectAllSpots);

//   useEffect(() => {
//     dispatch(getSpotsThunk())
//   }, [dispatch]);

//   if (!objAllSpots.length || !objAllSpots) {
//     console.log('entered')
//     dispatch(getSpotsThunk())
//     return null;
//   }

//   return (
//     <div className='spots-container'>
//       {objAllSpots.map(spot => (
//         <NavLink to={`/spot/${spot.id}`} key={spot.id} className='spot-title'>
//           <div key={spot.id} className='spot'>
//             <div className='image'><img src={spot.previewImage} alt='spotImg' title={spot.name} /></div>
//             <div className='details'>
//               <span className='cityState'>{spot.city}, {spot.state}</span>
//               <div className='right-side-ratings'>
//                 <span className='ratings'><i className='fa-solid fa-star'></i>{spot.avgRating}</span>
//               </div>
//             </div>
//             <div className='right-details'>
//               {/* <h3 className='spot-name'>{spot.name}</h3> */}
//               <span className='price'>${spot.price}/night</span>
//             </div>
//           </div>
//         </NavLink>
//       ))}
//     </div>
//   )
// }

// export default SpotsLandingPage;



// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getSpotsThunk } from '../../store/spots';
// import './AllSpots.css';

// function SpotsLandingPage() {
//   const dispatch = useDispatch();

//   // Selects store data objects
//   const selectAllSpots = useSelector(state => state.spots.allSpots);
//   const objAllSpots = Object.values(selectAllSpots);

//   useEffect(() => {
//     dispatch(getSpotsThunk())
//   }, [dispatch]);

//   if (!objAllSpots.length || !objAllSpots) {
//     console.log('entered')
//     dispatch(getSpotsThunk())
//     return null;
//   }

//   return (
//     <div className='spots-container'>
//       {objAllSpots.map(spot => (
//         <NavLink to={`/spot/${spot.id}`} key={spot.id} className='spot-title'>
//           <div key={spot.id} className='spot'>
//             <div className='image'><img src={spot.previewImage} alt='spotImg' title={spot.name} /></div>
//             <div className='details'>
//               <span className='cityState'>{spot.city}, {spot.state}</span>
//               <div className='right-side-ratings'>
//                 <span className='ratings'><i className='fa-solid fa-star'></i>{spot.avgRating}</span>
//               </div>
//             </div>
//             <div className='right-details'>
//               {/* <h3 className='spot-name'>{spot.name}</h3> */}
//               <span className='price'>${spot.price}/night</span>
//             </div>
//           </div>
//         </NavLink>
//       ))}
//     </div>
//   )
// }

// export default SpotsLandingPage;



// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getSpotsThunk } from '../../store/spots';
// import './AllSpots.css';

// function SpotsLandingPage() {
//   const dispatch = useDispatch();

//   // Selects store data objects
//   const selectAllSpots = useSelector(state => state.spots.allSpots);
//   const objAllSpots = Object.values(selectAllSpots);

//   useEffect(() => {
//     dispatch(getSpotsThunk())
//   }, [dispatch]);

//   if (!objAllSpots.length || !objAllSpots) {
//     console.log('entered')
//     dispatch(getSpotsThunk())
//     return null;
//   }

//   return (
//     <div className='spots-container'>
//       {objAllSpots.map(spot => (
//         <NavLink to={`/spot/${spot.id}`} key={spot.id} className='spot-title'>
//           <div key={spot.id} className='spot'>
//             <div className='image'><img src={spot.previewImage} alt='spotImg' title={spot.name} /></div>
//             <div className='details'>
//               <span className='cityState'>{spot.city}, {spot.state}</span>
//               <div className='right-side-ratings'>
//                 <span className='ratings'><i className='fa-solid fa-star'></i>{spot.avgRating}</span>
//               </div>
//             </div>
//             <div className='right-details'>
//               {/* <h3 className='spot-name'>{spot.name}</h3> */}
//               <span className='price'>${spot.price}/night</span>
//             </div>
//           </div>
//         </NavLink>
//       ))}
//     </div>
//   )
// }

// export default SpotsLandingPage;

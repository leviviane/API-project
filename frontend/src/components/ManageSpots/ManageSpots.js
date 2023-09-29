import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import { DeleteSpot } from '../ManageSpots/DeleteSpot';
import { deleteSpotThunk, getSpotsByUserThunk } from '../../store/spots';
import './ManageSpots.css';

function ManageSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userSpots = useSelector((state) => state.spots.allSpots);
    console.log('userSpots:!!!!', userSpots);
    const listsOfSpots = Object.values(userSpots);
    console.log('listOfSpots:!!!!', listsOfSpots);
    const { userId } = useParams();
    console.log('Manage Spots:', listsOfSpots);

    useEffect(() => {
        dispatch(getSpotsByUserThunk(userId));
    }, [dispatch, userId]);

    if (!userSpots || listsOfSpots.length === 0) {
        return null;
    }

    const newSpot = () => {
        history.push('/spots/new');
    };

    const spotDelete = (spotId) => {
        dispatch(deleteSpotThunk(spotId));
    };

    return (
        <div className="manage-spots-container">
            <h1>Manage Your Spots</h1>
            <div className="create-container">
                    <button className="create-button" onClick={newSpot}>
                        Create a Spot
                    </button>
                {listsOfSpots.length > 0 &&
                    listsOfSpots.map((spot) => (
                        <div className="spot-manage" key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <img
                                    src={spot.previewImage}
                                    className="image-box"
                                    alt={spot.name}
                                    name={spot.name}
                                />
                            </NavLink>
                            <div className="update-spot">
                                <p>{`${spot.city}, ${spot.state}`}</p>
                                <div className="ratings-container">
                                    <i className="fa-solid fa-star"></i>
                                    <p>{spot.avgRating || 'New'}</p>
                                </div>
                            </div>
                            <div>
                                <p>{`$${spot.price} / night`}</p>
                            </div>
                            <div className="update-button-container">
                                <div>
                                    <NavLink to={`/spots/${spot.id}/edit`}>
                                        <button className="update-button">Update</button>
                                    </NavLink>
                                </div>
                                <div>
                                    <OpenModalButton
                                        buttonText="Delete"
                                        onButtonClick={() => spotDelete(spot.id)}
                                        modalComponent={
                                            <DeleteSpot spotId={spot.id} ownerId={spot.ownerId} />
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ManageSpots;



//!!tried third time
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useParams, NavLink } from 'react-router-dom';
// import OpenModalButton from '../OpenModalButton';
// import { DeleteSpot } from '../ManageSpots/DeleteSpot';
// import { deleteSpotThunk, getSpotsByUserThunk } from '../../store/spots';
// import './ManageSpots.css';

// export const ManageSpots = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { userId } = useParams();

//     const userSpots = useSelector((state) => state.spots.userSpots);

//     useEffect(() => {
//         dispatch(getSpotsByUserThunk(userId));
//     }, [dispatch, userId]);

//     if (!userSpots || userSpots.length === 0) {
//         return null;
//     }

//     const newSpot = () => {
//         history.push('/spots/new');
//     };

//     const spotDelete = (spotId) => {
//         dispatch(deleteSpotThunk(spotId));
//     };

//     return (
//         <div className='manage-spots-container'>
//             <h1>Manage Your Spots</h1>
//             <div className='create-container'>
//                 {userSpots.length === 0 && (
//                     <button className='create-button' onClick={newSpot}>Create a Spot</button>
//                 )}
//                 {userSpots.length > 0 &&
//                     userSpots.map((spot) => (
//                         <div className='spot-manage' key={spot.id}>
//                             <NavLink to={`/spots/${spot.id}`}>
//                                 <img
//                                     src={spot.previewImage}
//                                     className='image-box'
//                                     alt={spot.name}
//                                     name={spot.name}
//                                 />
//                             </NavLink>
//                             <div className='update-spot'>
//                                 <p>{`${spot.city}, ${spot.state}`}</p>
//                                 <div className='ratings-container'>
//                                     <i className='fa-solid fa-star'></i>
//                                     <p>{spot.avgRating || 'New'}</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <p>{`$${spot.price} / night`}</p>
//                             </div>
//                             <div className='update-button-container'>
//                                 <div>
//                                     <NavLink to={`/spots/${spot.id}/edit`}>
//                                         <button className='update-button'>Update</button>
//                                     </NavLink>
//                                 </div>
//                                 <div>
//                                     <OpenModalButton
//                                         buttonText="Delete"
//                                         onButtonClick={() => spotDelete(spot.id)}
//                                         modalComponent={
//                                             <DeleteSpot
//                                                 spotId={spot.id}
//                                                 ownerId={spot.ownerId}
//                                             />
//                                         }
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default ManageSpots;



//!! use number 2
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useParams, NavLink } from 'react-router-dom';
// import OpenModalButton from '../OpenModalButton';
// import { DeleteSpot } from '../ManageSpots/DeleteSpot';
// import { deleteSpotThunk, getSpotsByUserThunk } from '../../store/spots';
// import './ManageSpots.css';

// export const ManageSpots = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { userId } = useParams();

//     const spots = useSelector((state) => state.spots.allSpots);

//     useEffect(() => {
//         dispatch(getSpotsByUserThunk());
//     }, [dispatch]);

//     if (!spots || Object.keys(spots).length === 0) {
//         return null;
//     }

//     const listOfSpots = Object.values(spots).filter((spot) => spot.ownerId === userId);

//     const newSpot = () => {
//         history.push('/spots/new');
//     };

//     const spotDelete = (spotId) => {
//         dispatch(deleteSpotThunk(spotId));
//     };

//     return (
//         <div className='manage-spots-container'>
//             <h1>Manage Your Spots</h1>
//             <div className='create-container'>
//                 {listOfSpots.length === 0 && (
//                     <button className='create-button' onClick={newSpot}>Create a Spot</button>
//                 )}
//                 {listOfSpots.length > 0 &&
//                     listOfSpots.map((spot) => (
//                         <div className='spot-manage' key={spot.id}>
//                             <NavLink to={`/spots/${spot.id}`}>
//                                 <img
//                                     src={spot.previewImage}
//                                     className='image-box'
//                                     alt={spot.name}
//                                     name={spot.name}
//                                 />
//                             </NavLink>
//                             <div className='update-spot'>
//                                 <p>{`${spot.city}, ${spot.state}`}</p>
//                                 <div className='ratings-container'>
//                                     <i className='fa-solid fa-star'></i>
//                                     <p>{spot.avgRating || 'New'}</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <p>{`$${spot.price} / night`}</p>
//                             </div>
//                             <div className='update-button-container'>
//                                 <div>
//                                     <NavLink to={`/spots/${spot.id}/edit`}>
//                                         <button className='update-button'>Update</button>
//                                     </NavLink>
//                                 </div>
//                                 <div>
//                                     <OpenModalButton
//                                         buttonText="Delete"
//                                         onButtonClick={() => spotDelete(spot.id)}
//                                         modalComponent={
//                                             <DeleteSpot
//                                                 spotId={spot.id}
//                                                 ownerId={spot.ownerId}
//                                             />
//                                         }
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default ManageSpots;






// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, NavLink } from 'react-router-dom';
// import * as spotsAction from '../..store/spots';
// import { getSpotsThunk } from '../../store/spots';
// import { DeleteSpot } from '../ManageSpots/DeleteSpot';
// import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
// import './ManageSpots.css';

// const ManageSpots = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const spots = useSelector((state) => state.spots.allSpots);
//     // const users = useSelector((state) => state.sessions.user);

//     let listOfSpots = Object.values(spots);

//     useEffect(() => {
//         dispatch(getSpotsThunk());
//       }, [dispatch]);

//       const newSpot = () => {
//         return history.push('/spots/new') //look at CreateSpot.js
//       }
//         return (
//             <div className='manage-spots-container'>
//                 <h1>Manage Your Spots</h1>
//                 <NavLink to={'/spots/new'}>
//                     <button className='create-button' onClick={newSpot}>Create a New Spot</button>
//                 </NavLink>
//             </div>
//         )
//       }
// }

// export default ManageSpots;

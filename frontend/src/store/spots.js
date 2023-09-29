import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT';
const ADD_SINGLE_SPOT = '/spots/ADD_SINGLE_SPOT';
const ADD_SPOT_IMAGE = '/spots/ADD_SPOT_IMAGE';
const UPDATE_SPOT = '/spots/UPDATE_SPOT';
const DELETE_SPOT = '/spots/DELETE_SPOT';
const GET_USER_SPOTS = '/spots/GET_USER_SPOTS';

// ACTION CREATORS
// all spots landing
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  };
};

// single spot detail
const getSingleSpot = (spot) => {
  return {
    type: GET_SINGLE_SPOT,
    spot
  };
};

// create a spot
const createSpot = (spot) => {
  return {
    type: ADD_SINGLE_SPOT,
    spot
  };
};

// add image
const addImage = (image) => {
  return {
    type: ADD_SPOT_IMAGE,
    image
  };
};

// update spot
const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  };
};

// delete spot
const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  };
};

// get all spots by user
const getSpotsByUser = spot => {
  return {
    type: GET_USER_SPOTS,
    spot
  };
};

// THUNKS
// get all spots
export const getSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots));
    return res;
  }
};

// single spot
export const getSingleSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(getSingleSpot(spot));
    return res;
  }
};

// create a spot
export const createSpotThunk = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(createSpot(newSpot));
    return newSpot;
  }
};

// add image
export const addSpotImageThunk = (spotId, url, preview) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, preview })
  });

  if (res.ok) {
    const addedSpotImage = await res.json();
    return addedSpotImage;
  }
};

// update spot
export const updateSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  });

  if (res.ok) {
    const spotUpdated = await res.json();
    dispatch(updateSpot(spotUpdated));
    return spotUpdated;
  }
};

// delete spot
export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteSpot(spotId));
  }
};

// get spots by user
export const getSpotsByUserThunk = () => async dispatch => {
  const response = await csrfFetch('/api/spots/current')
  if (response.ok) {
      const userSpots = await response.json()
      dispatch(getSpotsByUser(userSpots))
      return userSpots
  }
}

const initialState = {
  allSpots: {},
  singleSpot: {},
  userSpots: [],
};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state, allSpots: {} };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    case GET_SINGLE_SPOT:
      newState = { ...state, singleSpot: action.spot };
      return newState;
    case ADD_SINGLE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots } };
      newState.allSpots[action.spot.id] = action.spot;
      return newState;
    case UPDATE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots } };
      newState.allSpots[action.payload.id] = action.payload;
      return newState;
    case DELETE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots } };
      delete newState.allSpots[action.spotId];
      return newState;
    case GET_USER_SPOTS:
      newState = { ...state, allSpots: {} };
      action.spot.Spots.forEach(spot => {
        newState.allSpots[spot.id] = spot
        })
        return newState;
    default:
      return state;
  }
};

export default spotsReducer;





// import { csrfFetch } from "./csrf";

// const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
// const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT';
// const ADD_SINGLE_SPOT = '/spots/ADD_SINGLE_SPOT';
// const ADD_SPOT_IMAGE = '/spots/ADD_SPOT_IMAGE';
// const UPDATE_SPOT = '/spots/UPDATE_SPOT';
// const DELETE_SPOT = '/spots/DELETE_SPOT';
// const GET_SPOT_OWNER = '/spots/GET_SPOT_OWNER';

// //ACTION CREATORS
// //all spots landing
// const getAllSpots = (spots) => {
//   return {
//     type: GET_ALL_SPOTS,
//     spots
//   };
// };

// //single spot detail
// const getSingleSpot = (spot) => {
//   return {
//     type: GET_SINGLE_SPOT,
//     spot
//   };
// };

// //create a spot
// const createSpot = (spot) => {
//   return {
//     type: ADD_SINGLE_SPOT,
//     spot
//   };
// };

// // add image
// const addImage = (image) => {
//   return {
//     type: ADD_SPOT_IMAGE,
//     image
//     };
//   };

// // update spot
// const updateSpot = (spot) => {
//   return {
//     type: UPDATE_SPOT,
//     spot
//   };
// };

// //delete spot
// const deleteSpot = (spotId) => {
//   return {
//     type: DELETE_SPOT,
//     spotId
//   };
// };

// //get all spots by user
// const getSpotsByUser = (spots) => {
//   return {
//     type: GET_SPOT_OWNER,
//     spots
//   };
// };



// //THUNKS
// //get all spots
// export const getSpotsThunk = () => async (dispatch) => {
//   const res = await csrfFetch('/api/spots');
//   // console.log('res: ', res);
//   if (res.ok) {
//     const spots = await res.json();
//     dispatch(getAllSpots(spots));
//     return res;
//   };
// };

// //single spot
// export const getSingleSpotThunk = (spotId) => async (dispatch) => {
//   // console.log('spotid: ', spotId)
//   const res = await csrfFetch(`/api/spots/${spotId}`);

//   if (res.ok) {
//     const spot = await res.json();
//     // console.log('spot:', spot)
//     dispatch(getSingleSpot(spot))
//     return res;
//   };
// };

// //create a spot
// export const createSpotThunk = (payload) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots`, {
//     method: 'POST',
//     body: JSON.stringify(payload)
//   });

//   if (res.ok) {
//     const newSpot = await res.json();
//     dispatch(createSpot(newSpot));
//     return newSpot;
//   }
// };
// //add image
// export const addSpotImageThunk = (spotId, url, preview) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}/images`, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({ url, preview})
//   });

//   if (res.ok) {
//     const addedSpotImage = await res.json();
//     return addedSpotImage
//   }
// };

// //update spot
// export const updateSpotThunk = (spot) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spot.id}`, {
//     method: 'PUT',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(spot)
//   });

//   if (res.ok) {
//     const spotUpdated = await res.json();
//     dispatch(updateSpot(spotUpdated));
//     return spotUpdated;
//   }
// };

// //delete spot
// export const deleteSpotThunk = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`api/spots/${spotId}`, {
//     method: 'DELETE',
//   })

//   if (res.ok) {
//     dispatch(deleteSpot(spotId))
//   }
// };

// //get spots by user
// //get spots by user
// export const getSpotsByUserThunk = () => async (dispatch) => {
//   const res = await csrfFetch('/api/spots/current', {
//     method: 'GET',
//   });

//   if (res.ok) {
//     const data = await res.json();
//     dispatch(getSpotsByUser(data));
//   }
//   return res;
// };



// const initialState = {
//   allSpots: {},
//   singleSpot: {},
//   userSpots: {}
// };

// const spotsReducer = (state = initialState, action) => {
//   let newState;
//   switch(action.type) {
//     case GET_ALL_SPOTS:
//     newState = { ...state, allSpots: {}}
//     action.spots.Spots.forEach((spot) => {
//       newState.allSpots[spot.id] = spot;
//     })
//     return newState;
//     case GET_SINGLE_SPOT:
//       newState = { ...state, singleSpot: action.spot}
//       return newState;
//     case ADD_SINGLE_SPOT:
//       newState = { ...state, allSpots: {...state.allSpots}}
//       newState.allSpots[action.spot.id] = action.spot
//       return newState;
//      case UPDATE_SPOT:
//       newState = { ...state, allSpots: { ...state.allSpots}}
//       newState.allSpots[action.payload.id] = action.payload;
//       return newState;
//     case DELETE_SPOT:
//       newState = { ...state, allSpots: { ...state.allSpots } };
//       delete newState.allSpots[action.spotId];
//       return newState;
//     case GET_SPOT_OWNER:
//       newState = { ...state, userSpots: action.spots };
//       return newState;
//     default:
//       return state;
//   }
// }


// export default spotsReducer;

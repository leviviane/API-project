import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpot';
const LOAD_DETAILS = 'spots/loadDetails';
const CREATE_SPOT = 'spots/createSpot'
const ADD_IMAGE = 'spots/addImage';
const UPDATE_SPOT = 'spots/updateSpots';
const GET_USER = 'spots/getUsers';
const DELETE_SPOT = 'spots/deleteSpot';


const loadSpots = (spot) => {
    return {
        type: LOAD_SPOTS,
        payload: spot,
    };
};

const loadDetails = (spot) => {
    return {
        type: LOAD_DETAILS,
        payload: spot
    };
};

const createNewSpot = (spot) => {
  return {
      type: CREATE_SPOT,
      payload: spot
  };
};

const addImage = (img, spotId) => {
  return {
    type: ADD_IMAGE,
    payload: img, spotId
  };
};

const updateSpots = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot
  };
};

const getUsers = (spot) => {
  return {
    type: GET_USER,
    payload: spot
  };
};

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId
  }
}


//!! try and rename everything with thunk so its less confusing
//THUNK get all spots
export const getLoadedSpotsThunk = () => async(dispatch) => {
    const res = await csrfFetch('/api/spots');
    // console.log('response: ', response)
    if (res.ok) {
      const data = await res.json();
      dispatch(loadSpots(data));
      return data;
    };
};

//THUNK get spot details
export const getSpotDetailsThunk = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadDetails(data))
        return res;
    };
};

//THUNK create a spot
export const createSpotThunk = (spotData) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createNewSpot(data));
    return true;
  }
  return false;
}

//THUNK add images
export const addSpotImageThunk = (img, spotId) => async (dispatch) => {
  const { url, preview } = img;
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'POST',
    body: JSON.stringify({ url, preview }),
  });

  if (res.ok) {
    const uploadedImage = await res.json();
    dispatch(addImage(uploadedImage, spotId));
    return uploadedImage;
  }
}

//THUNK update a spot
export const updateSpotThunk = (spot, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(updateSpots(spot));
    return spot;
  }
}

//THUNK get user
export const getUserSpotThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current');
  if (res.ok) {
    const spots = await res.json();
    dispatch(getUsers(spots));
    return spots;
  }
}

//THUNK delete spot

const initialState = {
    allSpots: {},
    singleSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
      case LOAD_SPOTS:
        newState = {};
        // console.log(action)
        action.payload.Spots.forEach((spot) => {
          newState[spot.id] = spot;
        });
        return newState;

      case LOAD_DETAILS:
        const singleSpot = action.payload
        newState = {...state, singleSpot}
        return newState;

      case CREATE_SPOT:
        newState = {...state, allSpots: {...state.allSpots,[action.payload.id]: action.payload,
        },
      };
      return newState;
      case UPDATE_SPOT: {
        const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot },
        };
        newState.allSpots[action.spot.id] = { ...newState.allSpots[action.spotId], ...action.spot };
      }
      return newState;

    default:
      return state;

  }
}

export default spotsReducer;

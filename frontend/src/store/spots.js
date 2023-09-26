import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT';
const ADD_SINGLE_SPOT = '/spots/ADD_SINGLE_SPOT';
const ADD_SPOT_IMAGE = '/spots/ADD_SPOT_IMAGE';

//ACTION CREATORS
//all spots landing
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  };
};

//single spot detail
const getSingleSpot = (spot) => {
  return {
    type: GET_SINGLE_SPOT,
    spot
  }
}

//create a spot
const createSpot = (spot) => {
  return {
    type: ADD_SINGLE_SPOT,
    spot
  };
};

//add image
const addImage = (image) => {
  return {
    type: ADD_SPOT_IMAGE,
    image
    }
  }



//THUNKS
//get all spots
export const getSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  // console.log('res: ', res);
  if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots));
    return res;
  };
};

//single spot
export const getSingleSpotThunk = (spotId) => async (dispatch) => {
  // console.log('spotid: ', spotId)
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    // console.log('spot:', spot)
    dispatch(getSingleSpot(spot))
    return res;
  };
};

//create a spot
export const createSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
      method: 'POST',
      body: JSON.stringify(spot)
  })

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(createSpot(newSpot))
    return newSpot;
  }
};

//add image
export const addSpotImageThunk = (image, spotId) => async (dispatch) => {
  const { url, preview } = image
  const res = await csrfFetch(`api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify({ url, preview })
  })

  if (res.ok) {
    const newImage = await res.json();
    dispatch(addImage(newImage, spotId))
  }
}


const initialState = {
  allSpots: {},
  singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case GET_ALL_SPOTS:
    newState = { ...state, allSpots: {}}
    action.spots.Spots.forEach((spot) => {
      newState.allSpots[spot.id] = spot;
    })
    return newState;
    case GET_SINGLE_SPOT:
      newState = { ...state, singleSpot: action.spot}
      return newState;
    case ADD_SINGLE_SPOT:
      newState = { ...state, allSpots: {...state.allSpots}}
      newState.allSpots[action.spot.id] = action.spot
      return newState;

    default:
      return state;
  }
}


export default spotsReducer;

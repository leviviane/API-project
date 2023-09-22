import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT';

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


    default:
      return state;
  }
}


export default spotsReducer;

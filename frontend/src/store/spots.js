import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/GET_ALL)SPOTS';

//ACTION CREATORS
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  };
};


//THUNKS
export const getSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('api/spots');
  // console.log('res: ', res);
  if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots));
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

    default:
      return state;
  }
}


export default spotsReducer;

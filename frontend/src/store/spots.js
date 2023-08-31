import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpot';
const LOAD_DETAILS = 'spots/loadDetails';
const CREATE_SPOT = 'spots/createSpot';

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots,
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



//THUNKS
export const getLoadedSpots = () => async(dispatch) => {
    const response = await csrfFetch('/api/spots');
    console.log('response: ', response)
    if (response.ok) {
      const data = await response.json();
      dispatch(loadSpots(data));
      return data;
    };
};

export const getSpotDetails = (spotId) => async(dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(loadDetails(data))
        return response;
    };
};


export const createSpot = (spotData) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createNewSpot(data));
    return true;
  }
  return false;
}

const initialState = {
    allSpots: {},
    singleSot: {}
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
        const singleSpot = action.spot
        newState = {...state, singleSpot}
        return newState;

      case CREATE_SPOT:
        newState = {...state, allSpots: {...state.allSpots,[action.payload.id]: action.payload,
        },
      };
      return newState;

    default:
      return state;

  }
}

export default spotsReducer;

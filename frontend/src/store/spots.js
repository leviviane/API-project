import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpot';
const LOAD_DETAILS = 'spots/loadDetails';
const ADD_SPOTS = 'spots/addSpot';

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

const addSpot = (spot) => {
    return {
        type: ADD_SPOTS,
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

export const createSpot = (spot) => async(dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(spot)
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
}

const initialState = {
    allSpots: {},
    oneSpot: {}

}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
      case LOAD_SPOTS:
        newState = {};
        console.log(action)
        action.payload.Spots.forEach((spot) => {
          newState[spot.id] = spot;
        });
        return newState
      case LOAD_DETAILS:
        const oneSpot = action.spot
        newState = {...state, oneSpot}
        return newState;
        default:
        return state

    case ADD_SPOTS:
        newState = {...state};
        newState.allSpots[action.spot.id] = action.spot;
        return newState;
    }
  }


export default spotsReducer;

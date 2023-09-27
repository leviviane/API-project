import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const CREATE_REVIEW = '/reviews/CREATE_REVIEW';
const DELETE_REVIEW = '/reviews/DELETE_REVIEW';

//ACTION CREATORS
//get all reviews
const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
});

//create a review
const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

//delete a review
const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})



//THUNKS
//get reviews
export const getReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllReviews(data))
        return data;
    }
};

//create a review
export const createReviewThunk = (spotId, review, stars, user) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const data = await res.json();
        dispatch(createReview(data))
        return data;
    }
};

//delete a review
export const deleteReviewThunk = (reviewId) => async(dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteReview(reviewId))
        return data;
    }
};

const initialState = {
    reviews: {}
}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ALL_REVIEWS:
        newState = { ...state, reviews: {} }
        action.reviews.Reviews.forEach(review => {
          newState.reviews[review.id] = review
        })
        return newState;
        case CREATE_REVIEW:
            newState = { ...state, reviews: { ...state.reviews }}
            newState.reviews[action.review.id] = action.review
            return newState;
        case DELETE_REVIEW:
            newState = { ...state, reviews: { ...state.reviews}}
            delete newState.reviews[action.reviewId]
            return newState;

        default:
            return state;
    }
}

export default reviewsReducer;

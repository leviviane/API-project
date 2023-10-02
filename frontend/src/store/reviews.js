import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS";
const ADD_REVIEW = "review/ADD_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";

//action creator
//get all reviews
const getAllReviews = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

//post a review
const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

//delete review
const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

//THUNKS
//get review
export const getReviewsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getAllReviews(reviews));
    return reviews;
  }
};

//post a review
export const addReviewThunk = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(addReview(newReview));
    return newReview;
  }
};

//delete a review
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteReview(reviewId));
  }
};

const initialState = {
  spot: {},
  user: {},
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_REVIEWS:
        return { ...state, spot: action.reviews };
      case ADD_REVIEW:
        return {
          ...state,
          spot: {
            ...state.spot,
            Reviews: [...state.spot.Reviews, action.review],
          },
        };
      case DELETE_REVIEW:
        const updatedReviews = state.spot.Reviews.filter(
          (review) => review.id !== action.reviewId
        );
        return {
          ...state,
          spot: {
            ...state.spot,
            Reviews: updatedReviews,
          },
        };
      default:
        return state;
    }
  };

  export default reviewsReducer;

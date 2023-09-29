import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleSpotThunk } from "../../store/spots";
import { createReviewThunk } from "../../store/reviews";
import "./PostReview.css";

const PostReview = ({ spotId, user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [text, setText] = useState("");
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    // Validate review text and star rating
    const newErrors = {};

    if (text.length < 10) {
      newErrors.review = "Review must be at least 10 characters long";
    }
    if (stars < 1) {
      newErrors.stars = "Please add star rating.";
    }

    setErrors(newErrors);
  }, [text, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const payload = {
      review: text,
      stars,
    };

    try {
      await dispatch(createReviewThunk(payload, spotId));
      await dispatch(getSingleSpotThunk(spotId));
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      setServerError("ERROR!!!!");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="review-modal-content">
      <form className="submit-review-form" onSubmit={handleSubmit}>
        <div className="review-container">
          <h2>How was your stay?</h2>

          {serverError && <p className="server-error">{serverError}</p>}

          <textarea
            placeholder="Leave your review here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="stars-container">
            <div className="star-icons">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div
                  key={rating}
                  className={rating <= stars ? "filled" : "empty"}
                  onMouseEnter={() => setStars(rating)}
                  onMouseLeave={() => setStars(stars)}
                  onClick={() => setStars(rating)}
                >
                  <i className="fa-regular fa-star fa-2xs"></i>
                </div>
              ))}
            </div>
            <label className="star-label">Stars</label>
          </div>

          <button
            className="submit-review-button"
            type="submit"
            disabled={Object.keys(errors).length > 0 || !stars || text.length < 10}
          >
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostReview;




// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { getSingleSpotThunk } from "../../store/spots";
// import { createReviewThunk } from "../../store/reviews";
// import "./PostReview.css";

// export const PostReview = ({ spot, user }) => {
//   const dispatch = useDispatch();
//   const { closeModal } = useModal();
//   const [review, setReview] = useState("");
//   const [stars, setStars] = useState(null);
//   const [activeRating, setActiveRating] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState(null);

//   useEffect(() => {
//     const errors = {};

//     if (review.length < 10)
//       errors.review = "Review must be at least 10 characters long";
//     if (stars < 0) errors.stars = "Must rate at least one star";

//     setErrors(errors);
//   }, [review, stars]);

//   if (!user) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newReview = { stars, review };
//     const spotId = spot.id;

//     dispatch(createReviewThunk(newReview, spotId, user))
//       .then(() => dispatch(getSingleSpotThunk(spot.id)))
//       .then(() => closeModal())
//       .catch((error) => {
//         setServerError(error);
//       });
//   };

//   return (
//     <div className="review-modal-content">
//       <form className="submit-review-form" onSubmit={handleSubmit}>
//         <div className="review-container">
//           <h2>How was your stay?</h2>

//           {serverError && <p className="server-error">{serverError}</p>}

//           <textarea
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             placeholder="Leave your review here..."
//           />

//           <div className="stars-container">
//             <div className="star-icons">
//               <div
//                 className={activeRating >= 1 ? "filled" : "empty"}
//                 onMouseEnter={() => setActiveRating(1)}
//                 onMouseLeave={() => setActiveRating(stars)}
//                 onClick={() => setStars(1)}
//               >
//                 <i class="fa-regular fa-star fa-2xs"></i>
//               </div>
//               <div
//                 className={activeRating >= 2 ? "filled" : "empty"}
//                 onMouseEnter={() => setActiveRating(2)}
//                 onMouseLeave={() => setActiveRating(stars)}
//                 onClick={() => setStars(2)}
//               >
//                 <i class="fa-regular fa-star fa-2xs"></i>
//               </div>
//               <div
//                 className={activeRating >= 3 ? "filled" : "empty"}
//                 onMouseEnter={() => setActiveRating(3)}
//                 onMouseLeave={() => setActiveRating(stars)}
//                 onClick={() => setStars(3)}
//               >
//                 <i class="fa-regular fa-star fa-2xs"></i>
//               </div>
//               <div
//                 className={activeRating >= 4 ? "filled" : "empty"}
//                 onMouseEnter={() => setActiveRating(4)}
//                 onMouseLeave={() => setActiveRating(stars)}
//                 onClick={() => setStars(4)}
//               >
//                 <i class="fa-regular fa-star fa-2xs"></i>
//               </div>
//               <div
//                 className={activeRating >= 5 ? "filled" : "empty"}
//                 onMouseEnter={() => setActiveRating(5)}
//                 onMouseLeave={() => setActiveRating(stars)}
//                 onClick={() => setStars(5)}
//               >
//                 <i class="fa-regular fa-star fa-2xs"></i>
//               </div>
//             </div>
//             <label className="star-label">Stars</label>
//           </div>

//           <button
//             className="submit-review-button"
//             type="submit"
//             onClick={handleSubmit}
//             disabled={
//               Object.values(errors).length > 1 || !stars || review.length < 10
//             }
//           >
//             Submit Your Review
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PostReview;


// import { useState } from 'react';
// import { useDispatch} from 'react-redux';
// import { useModal } from '../../context/Modal';
// import { getSingleSpotThunk } from '../../store/spots';
// import { createReviewThunk } from '../../store/reviews';
// import StarRating from './StarsRating';
// import './PostReview.css';

// function PostReview ({spotId}) {
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();

//     const [text, setText] = useState('');
//     const [stars, setStars] = useState(1);
//     const [errors, setErrors] = useState({});

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors();

//         const payload = {
//             review: text,
//             stars
//         }

//         const reviewPosted = await dispatch(createReviewThunk(payload, spotId))
//         .catch(async(res) => {
//             const data = await res.json();
//             if (data && data.errors) {
//                 setErrors(data.errors)
//             }
//         });
//         if (reviewPosted) {
//             dispatch(getSingleSpotThunk(spotId))
//             closeModal();
//         }
//     };


//     return (
//         <div className='post-review-container'>
//             <form onSubmit={handleSubmit} id='post-review-container'>
//                 <h3>How was your stay?</h3>
//                 <div className='review-errors-container'>
//                     {errors.review && (<p>{errors.review}</p>)}
//                     {errors.stars && (<p>{errors.stars}</p>)}
//                 </div>
//             <textarea placeholder='Leave your review here...'
//             value={text}
//             onChange={e => setText(e.target.value)} />
//             </form>
//             <div className='star-rating-container'>
//                 <div className='stars-icon'
//                 onClick={(stars >= 1 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//                 <div className='stars-icon'
//                 onClick={(stars >= 2 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//                 <div className='stars-icon'
//                 onClick={(stars >= 3 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//                 <div className='stars-icon'
//                 onClick={(stars >= 4 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//                 <div className='stars-icon'
//                 onClick={(stars >= 5 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PostReview;


// import { useState } from 'react';
// import { useDispatch} from 'react-redux';
// import { useModal } from '../../context/Modal';
// import { getSingleSpotThunk } from '../../store/spots';
// import { createReviewThunk } from '../../store/reviews';
// import StarRating from './StarsRating';
// import './PostReview.css';

// function PostReview ({spotId}) {
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();

//     const [text, setText] = useState('');
//     const [stars, setStars] = useState(1);
//     const [errors, setErrors] = useState({});

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors();

//         const payload = {
//             review: text,
//             stars
//         }

//         const reviewPosted = await dispatch(createReviewThunk(payload, spotId))
//         .catch(async(res) => {
//             const data = await res.json();
//             if (data && data.errors) {
//                 setErrors(data.errors)
//             }
//         });
//         if (reviewPosted) {
//             dispatch(getSingleSpotThunk(spotId))
//             closeModal();
//         }
//     };


//     return (
//         <div className='post-review-container'>
//             <form onSubmit={handleSubmit} id='post-review-container'>
//                 <h3>How was your stay?</h3>
//                 <div className='review-errors-container'>
//                     {errors.review && (<p>{errors.review}</p>)}
//                     {errors.stars && (<p>{errors.stars}</p>)}
//                 </div>
//             <textarea placeholder='Leave your review here...'
//             value={text}
//             onChange={e => setText(e.target.value)} />
//             </form>
//             <div className='star-rating-container'>
//                 <div className='stars-icon'
//                 onClick={(stars >= 1 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//                 <div className='stars-icon'
//                 onClick={(stars >= 2 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//                 <div className='stars-icon'
//                 onClick={(stars >= 3 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//                 <div className='stars-icon'
//                 onClick={(stars >= 4 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//                 <div className='stars-icon'
//                 onClick={(stars >= 5 ? '<i class="fa-regular fa-star fa-xs"></i>' : '<i class="fa-regular fa-star fa-xs"></i>')}>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PostReview;

//this will give an error!
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { getSingleSpotThunk } from "../../store/spots";
// import { addReviewThunk } from "../../store/reviews";
// import "./PostReview.css";

// const PostReview = ({ spotId, user }) => {
//   const dispatch = useDispatch();
//   const { closeModal } = useModal();


//   const [review, setReview] = useState("");
//   const [stars, setStars] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState(null);

//   useEffect(() => {
//     // Validate review text and star rating
//     const newErrors = {};

//     if (review.length < 10) {
//       newErrors.review = "Review must be at least 10 characters long";
//     }
//     if (stars < 1) {
//       newErrors.stars = "Please add star rating.";
//     }

//     setErrors(newErrors);
//   }, [review, stars]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setServerError(null);

//     const payload = {
//       user,
//       spotId,
//       review,
//       stars
//     };

//     console.log('payload;!!!!!', payload);

//       await dispatch(addReviewThunk(payload, spotId));
//       await dispatch(getSingleSpotThunk(spotId));
//       closeModal();
//   };

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="review-modal-content">
//       <form className="submit-review-form" onSubmit={handleSubmit}>
//         <div className="review-container">
//           <h2>How was your stay?</h2>

//           {serverError && <p className="server-error">{serverError}</p>}

//           <textarea
//             placeholder="Leave your review here..."
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//           />

//           <div className="stars-container">
//             <div className="star-icons">
//               {[1, 2, 3, 4, 5].map((rating) => (
//                 <div
//                   key={rating}
//                   className={rating <= stars ? "filled" : "empty"}
//                   onMouseEnter={() => setStars(rating)}
//                   onMouseLeave={() => setStars(stars)}
//                   onClick={() => setStars(rating)}
//                 >
//                   <i className="fa-regular fa-star fa-2xs"></i>
//                 </div>
//               ))}
//             </div>
//             <label className="star-label">Stars</label>
//           </div>

//           <button
//             className="submit-review-button"
//             type="submit"
//             disabled={Object.keys(errors).length > 0 || !stars || review.length < 10}
//           >
//             Submit Your Review
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PostReview;




//!! this will give error in box
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom/";
import { useModal } from "../../context/Modal";
import { getSingleSpotThunk } from "../../store/spots";
import { addReviewThunk } from "../../store/reviews";
import "./PostReview.css";

const PostReview = ({ spot, user }) => {
  const dispatch = useDispatch();
  // const { userId } = useParams();
  const { closeModal } = useModal();


  const [text, setText] = useState("");
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
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
      spotId: spot.id,
      userId: user.id,
      review: text,
      stars
    };

    // console.log('spotid:!!!!', spotId)



    try {
      await dispatch(addReviewThunk(payload, spot.id));
      await dispatch(getSingleSpotThunk(spot.id));
      closeModal();
    } catch (error) {
      setServerError("An error occurred while submitting your review.");
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

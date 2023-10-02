import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleSpotThunk } from "../../store/spots";
import { addReviewThunk } from "../../store/reviews";
import "./PostReview.css";

const PostReview = ({ spot, user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [text, setText] = useState("");
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const payload = {
      spotId: spot.id,
      userId: user.id,
      review: text,
      stars,
    };

    try {
      await dispatch(addReviewThunk(payload, spot.id));
      await dispatch(getSingleSpotThunk(spot.id));
      closeModal();
    } catch (error) {
      setServerError("An error occurred while submitting your review.");
    }
  };

  const handleStarHover = (rating) => {
    setStars(rating);
  };

  return (
    <div className="review-modal-content">
      <form className="submit-review-form" onSubmit={handleSubmit}>
        <div className="review-container">
          <h2>How was your stay?</h2>

          {serverError && <p className="server-error">{serverError}</p>}

          <textarea
            className="review-textarea"
            placeholder="Leave your review here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="stars-container">
            <div className="star-icons-rating">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div
                  key={rating}
                  className={rating <= stars ? "filled" : "empty"}
                  onMouseEnter={() => handleStarHover(rating)}
                  onMouseLeave={() => handleStarHover(stars)}
                  onClick={() => setStars(rating)}
                >
                  <i className={rating <= stars ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
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

import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useModal } from '../../context/Modal';
import { getSingleSpotThunk } from '../../store/spots';
import { createReviewThunk } from '../../store/reviews';
import './PostReview.css';

function PostReview ({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [textReview, setTextReview] = useState('');
    const [stars, setStars] = useState(1);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors();

        const payload = {
            review: textReview,
            stars
        }

        const reviewPosted = await dispatch(createReviewThunk(payload, spotId))
        .catch(async(res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors)
            }
        });
        if (reviewPosted) {
            dispatch(getSingleSpotThunk(spotId))
            closeModal();
        }
    };
    const onChange = (num) => {
        setStars(num)
    };

    return (
        <div className='post-review-container'>
            <form onSubmit={handleSubmit} id='post-review-container'>
                <h3>How was your stay?</h3>
                <div className='review-errors-container'>
                    {errors.review && (<p>{errors.review}</p>)}
                    {errors.stars && (<p>{errors.stars}</p>)}
                </div>
            <textarea placeholder='Leave your review here...'
            value={textReview}
            onChange={e => setTextReview(e.target.value)} />
            </form>
            <div className='star-rating-container'>
                <div className='stars-icon'>
                    <div className={activeRating >= 1 ? 'filled' : 'empty'}>

                    </div>
                </div>
            </div>
        </div>

    )

}

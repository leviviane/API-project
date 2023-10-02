import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteReviewThunk } from '../../store/reviews';
// import { getSingleSpotThunk } from '../../store/spots';
import './DeleteReview';

function DeleteReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    // const { spotId } = useParams();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(reviewId)).then(closeModal);
        // await dispatch(getReviewsThunk(spotId));
        // await dispatch(getSingleSpotThunk(spotId));
        // closeModal();
    }

    const noDelete = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className='delete-container'>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to remove this review?</p>
            <div className='confirm-buttons'>
                <button
                id='yes-button'
                onClick={handleDelete}>
                    Yes (Delete Review)
                </button>
                <button
                id='no-button'
                onClick={noDelete}>
                    No (Keep Review)
                </button>
            </div>
        </div>
    )
};

export default DeleteReviewModal;



// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom/';
// import { useModal } from '../../context/Modal';
// import { deleteReviewThunk } from '../../store/reviews';
// import { getReviewsThunk } from '../../store/reviews';
// import { getSingleSpotThunk} from '../../store/spots';
// import './DeleteReview';


// function DeleteReviewModal({ reviewId }) {
//     const dispatch = useDispatch();
//     const { spotId } = useParams();
//     const { closeModal } = useModal();

//     const handleDelete = (e) => {
//         e.preventDefault();
//         dispatch(deleteReviewThunk(reviewId))
//         closeModal();
//     }

//     const noDelete = (e) => {
//         e.preventDefault();
//         closeModal();
//     }

//     dispatch(getReviewsThunk(spotId))
//     dispatch(getSingleSpotThunk(spotId))

//     return (
//         <div className='delete-container'>
//             <h3>Confirm Delete</h3>
//             <p>Are you sure you want to remove this review?</p>
//             <div className='confirm-buttons'>
//                 <button
//                 id='yes-button'
//                 onClick={handleDelete}>
//                     Yes (Delete Review)
//                 </button>
//                 <button
//                 id='no-button'
//                 onClick={noDelete}>
//                     No (Keep Review)
//                 </button>
//             </div>
//         </div>
//     )
// };

// export default DeleteReviewModal;

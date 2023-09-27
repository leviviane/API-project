import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewThunk } from '../../store/reviews';
import './DeleteReviewModal';


function DeleteReviewModal({ review }) {
    const dispatch = useDispatch()

    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(review))
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
                onClick={handleDelete}>
                    No (Keep Review)
                </button>
            </div>
        </div>
    )
};

export default DeleteReviewModal;

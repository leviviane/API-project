import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteSpotThunk } from "../../store/spots";
import './DeleteSpot.css';

export const DeleteSpot = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteSpotThunk(spotId)).then(closeModal);
    }

    const handleNoClick = async (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className='delete-spot-container'>
            <div className='confirm-spot-delete-box'>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to remove this spot from the listings?</p>
            </div>
            <div className='spot-yes-no-delete-button'>
                <button className='yes-button' onClick={handleClick}>Yes (Delete Spot)</button>
                <button className='no-button' onClick={handleNoClick}>No (Keep Spot)</button>
            </div>
        </div>
    )
};

export default DeleteSpot;

import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteSpotThunk } from "../../store/spots";
import './DeleteSpot.js';


export const DeleteSpot = ({spotId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spotId).then(closeModal))
    }

    return (
        <div className='delete-container'>
            <div className='delete-box'>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to remove this spot from the listings?</p>
            </div>
            <div className='delete-button'>
                <button className='yes-button' onClick={handleClick}>Yes (Delete Spot)</button>
                <button className='no-button' onClick={handleClick}>No (Keep Spot)</button>
            </div>
        </div>
    )
};

export default DeleteSpot;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpotThunk } from '../../store/spots';
import './CreateForm.css';

function CreateForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    // const [latitude, setLatitude] = useState();
    // const [longitude, setLongitude] = useState();
    const [describe, setDescribe] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [previewImg, setPreviewImg] = useState();
    const [imgOne, setImgOne] = useState();
    const [imgTwo, setImgTwo] = useState();
    const [imgThree, setImgThree] = useState();
    const [imgFour, setImgFour] = useState();
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = checkErrors(
            country,
            address,
            city,
            state,
            // latitude,
            // longitude,
            describe,
            title,
            price,
            previewImg,
            imgOne,
            imgTwo,
            imgThree,
            imgFour
        );
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const newSpot = {
                country,
                address,
                city,
                state,
                title,
                describe,
                price,
            };
            const submittedSpot = await dispatch(createSpotThunk(newSpot));
            if (submittedSpot) {
                history.push(`/spot/${submittedSpot.id}`);
            }
        }
    }
    const checkErrors = (
        country,
        address,
        city,
        state,
        // latitude,
        // longitude,
        describe,
        title,
        price,
        previewImg,
        imgOne,
        imgTwo,
        imgThree,
        imgFour
    ) => {
        const errors = {};

        if (!country) {
            errors.country = "Country is required";
        }

        if (describe.length < 30) {
            errors.describe = "Description needs to be 30 characters or more";
        }

        if (!title) {
            errors.title = "Title is required";
        }

        if (!price) {
            errors.price = "Price per night is required";
        }

        if (!previewImg) {
            errors.previewImg = "Preview Image URL is required";
        }

        if (previewImg && !previewImg.endsWith('jpeg') &&
        !previewImg.endsWith('jpg') && !previewImg.endsWith('png')
        )
        errors.previewImg = 'Image URL must end with .jpeg, .jpg, or .png'

        if (imgOne && !imgOne.endsWith('jpeg') &&
        !imgOne.endsWith('jpg') && !imgOne.endsWith('png')
        )
        errors.imgOne = 'Image URL must end with .jpeg, .jpg, or .png'

        if (imgTwo && !imgTwo.endsWith('jpeg') &&
        !imgTwo.endsWith('jpg') && !imgTwo.endsWith('png')
        )
        errors.imgTwo = '.png'

        if (imgThree && !imgThree.endsWith('jpeg') &&
        !imgThree.endsWith('jpg') && !imgThree.endsWith('png')
        )
        errors.imgThree = 'Image URL must end with .jpeg, .jpg, or .png'

        if (imgFour && !imgFour.endsWith('jpeg') &&
        !imgFour.endsWith('jpg') && !imgFour.endsWith('png')
        )
        errors.imgFour = 'Image URL must end with .jpeg, .jpg, or .png'
    }
    return (
        <div className='spot-form-container'>
            <h1>Create a New Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>

            <form onSubmit={handleSubmit}>
                <label>Country
                    <input type='text' value={country} onChange={(e) => setCountry(e.target.value)}
                    placeholder='Country' />
                </label>
                {errors.country && <p>{errors.country}</p>}
                <label>Street Address
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)}
                placeholder='Address' />
                </label>
                {errors.address && <p>{errors.address}</p>}
                <label>City
                <input type='text' value={city} onChange={(e) => setCity(e.target.value)}
                placeholder='City'/>
                </label>
                {errors.city && <p>{errors.city}</p>}
                <label>State
                <input type='text' value={state} onChange={(e) => setState(e.target.value)}
                placeholder='State' />
                </label>
                {errors.state && <p>{errors.state}</p>}

                <div className='describe-container'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</p>
                    <textarea value={describe} onChange={(e) => setDescribe(e.target.value)}
                    placeholder='Please write at least 30 characters' />
                    {errors.describe && <p>{errors.describe}</p>}
                </div>

                <div className='title-container'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <textarea value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder='Name of your spot' />
                    {errors.title && <p>{errors.title}</p>}
                </div>

                <div className='price-container'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <input type='number' value={price} onChange={(e) => setPrice(e.target.value)}
                    placeholder='Price per night (USD)' />
                    {errors.title && <p>{errors.title}</p>}
                </div>

                <div className='image-container'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input type='url' value={previewImg} onChange={(e) => setPreviewImg(e.target.value)}
                    placeholder='Preview Image URL' />
                    {errors.previewImg && <p>{errors.previewImg}</p>}
                    <input type='url' value={imgOne} onChange={(e) => setImgOne(e.target.value)}
                    placeholder='Image URL' />
                    {errors.imgOne && <p>{errors.imgOne}</p>}
                    <input type='url' value={imgTwo} onChange={(e) => setImgTwo(e.target.value)}
                    placeholder='Image URL' />
                    {errors.imgTwo && <p>{errors.imgTwo}</p>}
                    <input type='url' value={imgThree} onChange={(e) => setImgThree(e.target.value)}
                    placeholder='Image URL' />
                    {errors.imgThree && <p>{errors.imgThree}</p>}
                    <input type='url' value={imgThree} onChange={(e) => setImgFour(e.target.value)}
                    placeholder='Image URL' />
                    {errors.imgFour && <p>{errors.imgFour}</p>}
                </div>
                <button type='submit'>Create Spot</button>
            </form>
        </div>

    )

}

export default CreateForm;

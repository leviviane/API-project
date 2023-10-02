import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpotThunk, addSpotImageThunk, getSingleSpotThunk } from '../../store/spots';
import './CreateSpot.css';

export const CreateSpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [previewImg, setpreviewImg] = useState("");
  const [imgOne, setImgOne] = useState("");
  const [imgTwo, setImgTwo] = useState("");
  const [imgThree, setImgThree] = useState("");
  const [imgFour, setImgFour] = useState("");
  const [errors, setErrors] = useState({});

  function errorsChecked(
    country,
    address,
    city,
    state,
    description,
    name,
    price,
    previewImg,
    imgOne,
    imgTwo,
    imgThree,
    imgFour
  ) {
    const errors = {};
    if (!country) errors.country = "Country is required";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (description.length < 30) errors.description = "Description needs 30 or more characters";
    if (!name) errors.name = "Name is required";
    if (!price) errors.price = "price is required";
    if (!previewImg) errors.previewImg = "preview image is required";
    if (previewImg && !previewImg.endsWith("jpg") && !previewImg.endsWith("jpeg") && !previewImg.endsWith("png")) errors.previewImg = "Image URL must end in .png, .jpg, or .jpeg";
    if (imgOne && !imgOne.endsWith("jpg") && !imgOne.endsWith("jpeg") && !imgOne.endsWith("png")) errors.imgOne = "Image URL must end in .png, .jpg, or .jpeg";
    if (imgTwo && !imgTwo.endsWith("jpg") && !imgTwo.endsWith("jpeg") && !imgTwo.endsWith("png")) errors.imgTwo = "Image URL must end in .png, .jpg, or .jpeg";
    if (imgThree && !imgThree.endsWith("jpg") && !imgThree.endsWith("jpeg") && !imgThree.endsWith("png")) errors.imgThree = "Image URL must end in .png, .jpg, or .jpeg";
    if (imgFour && !imgFour.endsWith("jpg") && !imgFour.endsWith("jpeg") && !imgFour.endsWith("png")) errors.imgFour = "Image URL must end in .png, .jpg, or .jpeg";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      previewImg,
      imgOne,
      imgTwo,
      imgThree,
      imgFour
    );

    if (Object.keys(errorsFound).length === 0) {
      const payload = {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        previewImg,
        imgOne,
        imgTwo,
        imgThree,
        imgFour,
        lat: 1,
        lng: 1
      };

      const newSpot = await dispatch(createSpotThunk(payload));
      await dispatch(addSpotImageThunk(newSpot.id, previewImg, true));
      await dispatch(addSpotImageThunk(newSpot.id, imgOne, false));
      await dispatch(addSpotImageThunk(newSpot.id, imgTwo, false));
      await dispatch(addSpotImageThunk(newSpot.id, imgThree, false));
      await dispatch(addSpotImageThunk(newSpot.id, imgFour, false));

      if (newSpot) {
        dispatch(getSingleSpotThunk(newSpot.id));
        history.push(`/spot/${newSpot.id}`);
      }
    }
  };

  return (
    <>
      <div className='form-container'>
        <h1>Create a new Spot</h1>
        <div>
          <h2>Where's your place located?</h2>
          <h4>Guests will only get your exact address once they booked a reservation.</h4>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='elements-filled'>
          <label>
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </label>
          {errors.country && <p className='errors'>{errors.country}</p>}
          <label>
            Street Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </label>
          {errors.address && <p className='errors'>{errors.address}</p>}
        </div>
        <div className='elements-filled-2'>
          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </label>
          {errors.city && <p className='errors'>{errors.city}</p>}
          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            />
          </label>
          {errors.state && <p className='errors'>{errors.state}</p>}
        </div>
        <div className='elements-filled-3'>
          <h2>Describe your place to guests</h2>
          <h4>
            Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood
          </h4>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="please write at least 30 characters"
            rows="5"
          ></textarea>
          {errors.description && <p className='errors'>{errors.description}</p>}
        </div>
        <div className='elements-filled-4'>
          <h2>Create a title for your spot</h2>
          <label>
            Catch guests' attention with a spot title that highlights what makes your place special.
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of your spot"
            />
          </label>
          {errors.name && <p className='errors'>{errors.name}</p>}
        </div>
        <div className='elements-filled-5'>
          <h2>Set a base price for your spot</h2>
          <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
          <div className="price-input">
            <span className="dollar-sign">$</span>
            <input
            type="number"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            placeholder="price per night (USD)" />
            </div>
            {errors.price && <p className='errors'>{errors.price}</p>}
          </div>
        <div className='elements-filled-6'>
          <h2>Liven up your spot with photos</h2>
          <label>
            Submit a link to at least one photo to publish your spot.
            <input
              type="url"
              value={previewImg}
              onChange={(e) => setpreviewImg(e.target.value)}
              placeholder="preview Image URL"
            />
          </label>
          {errors.previewImg && <p className='errors'>{errors.previewImg}</p>}
          <input
            type="url"
            value={imgOne}
            onChange={(e) => setImgOne(e.target.value)}
            placeholder="Image URL"
          />
          {errors.imgOne && <p className='errors'>{errors.imgOne}</p>}
          <input
            type="url"
            value={imgTwo}
            onChange={(e) => setImgTwo(e.target.value)}
            placeholder="Image URL"
          />
          {errors.imgTwo && <p className='errors'>{errors.imgTwo}</p>}
          <input
            type="url"
            value={imgThree}
            onChange={(e) => setImgThree(e.target.value)}
            placeholder="Image URL"
          />
          {errors.imgThree && <p className='errors'>{errors.imgThree}</p>}
          <input
            type="url"
            value={imgFour}
            onChange={(e) => setImgFour(e.target.value)}
            placeholder="Image URL"
          />
          {errors.imgFour && <p className='errors'>{errors.imgFour}</p>}
        </div>
        <div className='elements-filled-7'>
        <button type="submit">Create spot</button>
        </div>
      </form>
    </>
  );
}

export default CreateSpotForm;

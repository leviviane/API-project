import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleSpotThunk, getSpotsThunk, updateSpotThunk } from "../../store/spots";
import './UpdateSpot.css';

function UpdateSpot() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [imgOne, setImgOne] = useState("");
  const [imgTwo, setImgTwo] = useState("");
  const [imgThree, setImgThree] = useState("");
  const [imgFour, setImgFour] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    dispatch(getSpotsThunk())
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot) {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
      setPreviewImg(spot.previewImg);
      setImgOne(spot.imgOne);
      setImgTwo(spot.imgTwo);
      setImgThree(spot.imgThree);
      setImgFour(spot.imgFour);
    }
  }, [spot]);

  const errorsChecked = ({
    country,
    address,
    city,
    state,
    name,
    description,
    price,
    previewImg,
    imgOne,
    imgTwo,
    imgThree,
    imgFour,
  }) => {
    const errors = {};
    if (!country) errors.country = "Country is required";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (description && description.length < 30) errors.description = "Description needs 30 or more characters";
    if (!name) errors.name = "Name is required";
    if (!price) errors.price = "Price is required";
    if (!previewImg) errors.previewImg = "Preview image is required";
    if (previewImg && !previewImg.endsWith("jpg") && !previewImg.endsWith("jpeg") && !previewImg.endsWith("png")) {
      errors.previewImg = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (imgOne && !imgOne.endsWith("jpg") && !imgOne.endsWith("jpeg") && !imgOne.endsWith("png")) {
      errors.imgOne = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (imgTwo && !imgTwo.endsWith("jpg") && !imgTwo.endsWith("jpeg") && !imgTwo.endsWith("png")) {
      errors.imgTwo = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (imgThree && !imgThree.endsWith("jpg") && !imgThree.endsWith("jpeg") && !imgThree.endsWith("png")) {
      errors.imgThree = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (imgFour && !imgFour.endsWith("jpg") && !imgFour.endsWith("jpeg") && !imgFour.endsWith("png")) {
      errors.imgFour = "Image URL must end in .png, .jpg, or .jpeg";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked({
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
    });
    setErrors(errorsFound);

    if (Object.keys(errors).length === 0) {
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
        lng: 1,
        id: spotId
      };
      const newSpot = await dispatch(updateSpotThunk(payload));
      if (newSpot) {
        history.push(`/spot/${newSpot.id}`);
      }
    }
  };

  return (
    <div className="update-container">
      <div className="update-spot-container">
        <h1>Update your Spot</h1>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Country
            <input
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </label>
          {errors.country && <p>{errors.country}</p>}
          <label>
            Street Address
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </label>
          {errors.address && <p>{errors.address}</p>}
        </div>
        <div>
          <label>
            City
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </label>
          {errors.city && <p>{errors.city}</p>}
          <label>
            State
            <input
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            />
          </label>
          {errors.state && <p>{errors.state}</p>}
        </div>
        <div>
          <h2>Describe your place to guests</h2>
          <h4>
            Mention the best features of your space, any special amenities
            like fast wifi or parking, and what you love about the
            neighborhood
          </h4>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
            rows="5"
          ></textarea>
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <h2>Create a title for your spot</h2>
          <label>
            Catch guests' attention with a spot title that highlights what
            makes your place special.
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of your spot"
            />
          </label>
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <h2>Set a base price for your spot</h2>
          <h4>
            Competitive pricing can help your listing stand out and rank
            higher in search results.
          </h4>
          <div>
            <label>
              $
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price per night (USD)"
              />
            </label>
            {errors.price && <p>{errors.price}</p>}
          </div>
        </div>
        <div>
          <h2>Liven up your spot with photos</h2>
          <label>
            Submit a link to at least one photo to publish your spot.
            <input
              type="url"
              value={previewImg}
              onChange={(e) => setPreviewImg(e.target.value)}
              placeholder="Preview Image URL"
            />
          </label>
          {errors.previewImg && <p>{errors.previewImg}</p>}
          <input
            type="url"
            value={imgOne}
            onChange={(e) => setImgOne(e.target.value)}
            placeholder="Image URL"
          />
          {errors.imgOne && <p>{errors.imgOne}</p>}
          <input
            type="url"
            value={imgTwo}
            onChange={(e) => setImgTwo(e.target.value)}
            placeholder="Image URL"
          />
          {errors.imgTwo && <p>{errors.imgTwo}</p>}
          <input
            type="url"
            value={imgThree}
            onChange={(e) => setImgThree(e.target.value)}
            placeholder="Image URL"
          />
          {errors.imgThree && <p>{errors.imgThree}</p>}
          <input
            type="url"
            value={imgFour}
            onChange={(e) => setImgFour(e.target.value)}
            placeholder="Image URL"
          />
          {errors.imgFour && <p>{errors.imgFour}</p>}
        </div>
        <button type="submit">Create spot</button>
      </form>
    </div>
  );
}

export default UpdateSpot;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useParams, useHistory } from "react-router-dom";
// import { getSingleSpotThunk, updateSpotThunk } from "../../store/spots";
// import './UpdateSpot.css';

// function UpdateSpot() {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const { spotId } = useParams();

//   const [country, setCountry] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [description, setDescription] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [previewImg, setPreviewImg] = useState("");
//   const [imgOne, setImgOne] = useState("");
//   const [imgTwo, setImgTwo] = useState("");
//   const [imgThree, setImgThree] = useState("");
//   const [imgFour, setImgFour] = useState("");
//   const [errors, setErrors] = useState({});

//   const errorsChecked = ({
//     country,
//     address,
//     city,
//     state,
//     name,
//     description,
//     price,
//     previewImg,
//     imgOne,
//     imgTwo,
//     imgThree,
//     imgFour,
//   }) => {
//     const errors = {};
//     if (!country) errors.country = "Country is required";
//     if (!address) errors.address = "Address is required";
//     if (!city) errors.city = "City is required";
//     if (!state) errors.state = "State is required";
//     if (description && description.length < 30) errors.description = "Description needs 30 or more characters";
//     if (!name) errors.name = "Name is required";
//     if (!price) errors.price = "Price is required";
//     if (!previewImg) errors.previewImg = "Preview image is required";
//     if (previewImg && !previewImg.endsWith("jpg") && !previewImg.endsWith("jpeg") && !previewImg.endsWith("png")) {
//       errors.previewImg = "Image URL must end in .png, .jpg, or .jpeg";
//     }
//     if (imgOne && !imgOne.endsWith("jpg") && !imgOne.endsWith("jpeg") && !imgOne.endsWith("png")) {
//       errors.imgOne = "Image URL must end in .png, .jpg, or .jpeg";
//     }
//     if (imgTwo && !imgTwo.endsWith("jpg") && !imgTwo.endsWith("jpeg") && !imgTwo.endsWith("png")) {
//       errors.imgTwo = "Image URL must end in .png, .jpg, or .jpeg";
//     }
//     if (imgThree && !imgThree.endsWith("jpg") && !imgThree.endsWith("jpeg") && !imgThree.endsWith("png")) {
//       errors.imgThree = "Image URL must end in .png, .jpg, or .jpeg";
//     }
//     if (imgFour && !imgFour.endsWith("jpg") && !imgFour.endsWith("jpeg") && !imgFour.endsWith("png")) {
//       errors.imgFour = "Image URL must end in .png, .jpg, or .jpeg";
//     }

//     return errors;
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errorsFound = errorsChecked(
//       country,
//       address,
//       city,
//       state,
//       description,
//       name,
//       price,
//       previewImg,
//       imgOne,
//       imgTwo,
//       imgThree,
//       imgFour
//     );
//     setErrors(errorsFound);

//     if (Object.keys(errorsFound).length === 0) {
//       return;
//     }

//     const payload = {
//       country,
//       address,
//       city,
//       state,
//       description,
//       name,
//       price,
//       previewImg,
//       imgOne,
//       imgTwo,
//       imgThree,
//       imgFour,
//       lat: 1,
//       lng: 1,
//       id: spotId
//     };
//     const newSpot = await dispatch(updateSpotThunk(payload));
//     dispatch(getSingleSpotThunk(spotId));
//     history.push(`/spots/${newSpot.id}`);
//   };

//   return (
//     <div className="update-container">
//       <div className="update-spot-container">
//         <h1>Update your Spot</h1>
//         <h2>Where's your place located?</h2>
//         <p>Guests will only get your exact address once they booked a reservation.</p>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Country
//             <input
//               type="text"
//               name="country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               placeholder="Country"
//             />
//           </label>
//           {errors.country && <p>{errors.country}</p>}
//           <label>
//             Street Address
//             <input
//               type="text"
//               name="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Address"
//             />
//           </label>
//           {errors.address && <p>{errors.address}</p>}
//         </div>
//         <div>
//           <label>
//             City
//             <input
//               type="text"
//               name="city"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               placeholder="City"
//             />
//           </label>
//           {errors.city && <p>{errors.city}</p>}
//           <label>
//             State
//             <input
//               type="text"
//               name="state"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               placeholder="State"
//             />
//           </label>
//           {errors.state && <p>{errors.state}</p>}
//         </div>
//         <div>
//           <h2>Describe your place to guests</h2>
//           <h4>
//             Mention the best features of your space, any special amenities
//             like fast wifi or parking, and what you love about the
//             neighborhood
//           </h4>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Please write at least 30 characters"
//             rows="5"
//           ></textarea>
//           {errors.description && <p>{errors.description}</p>}
//         </div>
//         <div>
//           <h2>Create a title for your spot</h2>
//           <label>
//             Catch guests' attention with a spot title that highlights what
//             makes your place special.
//             <input
//               type="text"
//               name="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name of your spot"
//             />
//           </label>
//           {errors.name && <p>{errors.name}</p>}
//         </div>
//         <div>
//           <h2>Set a base price for your spot</h2>
//           <h4>
//             Competitive pricing can help your listing stand out and rank
//             higher in search results.
//           </h4>
//           <div>
//             <label>
//               $
//               <input
//                 type="number"
//                 name="price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 placeholder="Price per night (USD)"
//               />
//             </label>
//             {errors.price && <p>{errors.price}</p>}
//           </div>
//         </div>
//         <div>
//           <h2>Liven up your spot with photos</h2>
//           <label>
//             Submit a link to at least one photo to publish your spot.
//             <input
//               type="url"
//               value={previewImg}
//               onChange={(e) => setPreviewImg(e.target.value)}
//               placeholder="Preview Image URL"
//             />
//           </label>
//           {errors.previewImg && <p>{errors.previewImg}</p>}
//           <input
//             type="url"
//             value={imgOne}
//             onChange={(e) => setImgOne(e.target.value)}
//             placeholder="Image URL"
//           />
//           {errors.imgOne && <p>{errors.imgOne}</p>}
//           <input
//             type="url"
//             value={imgTwo}
//             onChange={(e) => setImgTwo(e.target.value)}
//             placeholder="Image URL"
//           />
//           {errors.imgTwo && <p>{errors.imgTwo}</p>}
//           <input
//             type="url"
//             value={imgThree}
//             onChange={(e) => setImgThree(e.target.value)}
//             placeholder="Image URL"
//           />
//           {errors.imgThree && <p>{errors.imgThree}</p>}
//           <input
//             type="url"
//             value={imgFour}
//             onChange={(e) => setImgFour(e.target.value)}
//             placeholder="Image URL"
//           />
//           {errors.imgFour && <p>{errors.imgFour}</p>}
//         </div>
//         <button type="submit">Create spot</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateSpot;







// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';
// import { getSingleSpotThunk, updateSpotThunk } from '../../store/spots';
// import './UpdateSpot.css';

// export const UpdateSpot = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { spotId } = useParams();

//     const [country, setCountry] = useState("");
//     const [address, setAddress] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [description, setDescription] = useState("");
//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [previewImg, setPreviewImg] = useState("");
//     const [errors, setErrors] = useState({});

//     const [updateCountry, setUpdateCountry] = useState("");
//     const [updateAddress, setUpdateAddress] = useState("");
//     const [updateCity, setUpdateCity] = useState("");
//     const [updateState, setUpdateState] = useState("");
//     const [updateDescription, setUpdateDescription] = useState("");
//     const [updateName, setUpdateName] = useState("");
//     const [updatePrice, seyUpdatePrice] = useState("");
//     const [updatePreviewImg, setUpdatePreviewImg] = useState("");

//     useEffect(() => {
//         dispatch(thunkGetSpotDetails(spotId)).then((res) => {
//           setCountry(res.country);
//           setAddress(res.address);
//           setCity(res.city);
//           setState(res.state);
//           setDescription(res.description);
//           setName(res.name);
//           setPrice(res.price);
//           setPreviewImg(res.SpotImages[0].url);
//         });
//       }, [dispatch, spotId]);
// }


// export default UpdateSpot;

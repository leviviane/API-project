// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { createSpotThunk, addSpotImageThunk, getSingleSpotThunk, updateSpotThunk } from '../../store/spots';


// export function CreateSpotForm ({spot, formType}) {
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const [country, setCountry] = useState("");
//     const [address, setAddress] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [description, setDescription] = useState("");
//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [previewImg, setPreviewImg] = useState(spot.SpotImages[0] ? spot.SpotImages[0].url : '');
//     const [imgOne, setImgOne] = useState(spot.SpotImages[1] ? spot.SpotImages[1].url : '');
//     const [imgTwo, setImgTwo] = useState(spot.SpotImages[2] ? spot.SpotImages[2].url : '');
//     const [imgThree, setImgThree, setImageUrl4] = useState(spot.SpotImages[3] ? spot.SpotImages[3].url : '');
//     const [imgFour, setImgFour] = useState(spot.SpotImages[4] ? spot.SpotImages[4].url : '');
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         setCountry(spot.country);
//         setAddress(spot.address);
//         setCity(spot.city);
//         setState(spot.state);
//         setDescription(spot.description);
//         setName(spot.name);
//         setPrice(spot.price);
//         setPreviewImg(spot.SpotImages[0] ? spot.SpotImages[0].url : '');
//         setImgOne(spot.SpotImages[1] ? spot.SpotImages[1].url : '');
//         setImgTwo(spot.SpotImages[2] ? spot.SpotImages[2].url : '');
//         setImgThree(spot.SpotImages[3] ? spot.SpotImages[3].url : '');
//         setImgFour(spot.SpotImages[4] ? spot.SpotImages[4].url : '');
//     }, [dispatch, spot])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors({});

//         const payload = {
//             ...spot,
//             country,
//             address,
//             city,
//             state,
//             description,
//             name,
//             price,
//             previewImg,
//             imgOne,
//             imgTwo,
//             imgThree,
//             imgFour
//         }

//         const imagePayload = [];
//         if(previewImg) imagePayload.push({url: previewImg, preview: true});
//         if(imgOne) imagePayload.push({url: imgOne, preview: false});
//         if(imgTwo) imagePayload.push({url: imgTwo, preview: false});
//         if(imgThree) imagePayload.push({url: imgThree, preview: false});
//         if(imgFour) imagePayload.push({url: imgFour, preview: false});

//         if (formType === 'Create') {
//             const spotCreated = await dispatch(createSpotThunk(payload))
//             .catch(async(res) => {
//                 const data = await res.json()
//                 if (data && data.errors) {
//                     setErrors(data.errors);
//                 }
//             })

//             if (spotCreated) {
//                 for (let spotImage of imagePayload) {
//                     await dispatch(addSpotImageThunk(spotImage, spotCreated.id))
//                 }
//                 await dispatch(getSingleSpotThunk(spotCreated.id))
//                 history.push(`/spots/${spotCreated.id}`)
//             }
//         } else if (formType === 'Update') {
//             const spotUpdated = await dispatch(updateSpot(payload, spot.id))
//             .catch(async(res) => {
//                 const data = await res.json();
//                 if (data && data.errors) {
//                     setErrors(data.errors)
//                 }
//             })

//             if (spotUpdated) {
//                 await dispatch(getSingleSpotThunk(spotUpdated.id))
//                 history.push(`/spots/${spotUpdated.id}`)
//             }
//         }
//     }
//     return (
//         <>
//            <div>
//               <h1>Create a new Spot</h1>
//               <h2>Where's your place located?</h2>
//               <h4>
//                  Guests will only get your exact address once they booked a
//                  reservation.
//               </h4>
//            </div>
//            <form onSubmit={handleSubmit}>
//               <div>
//                  <label>
//                     Country
//                     <input
//                        type="text"
//                        value={country}
//                        onChange={(e) => setCountry(e.target.value)}
//                        placeholder="Country"
//                     />
//                  </label>
//                  {errors.country && <p>{errors.country}</p>}
//                  <label>
//                     Street Address
//                     <input
//                        type="text"
//                        value={address}
//                        onChange={(e) => setAddress(e.target.value)}
//                        placeholder="Address"
//                     />
//                  </label>
//                  {errors.address && <p>{errors.address}</p>}
//               </div>
//               <div>
//                  <label>
//                     City
//                     <input
//                        type="text"
//                        value={city}
//                        onChange={(e) => setCity(e.target.value)}
//                        placeholder="City"
//                     />
//                  </label>
//                  {errors.city && <p>{errors.city}</p>}
//                  <label>
//                     State
//                     <input
//                        type="text"
//                        value={state}
//                        onChange={(e) => setState(e.target.value)}
//                        placeholder="STATE"
//                     />
//                  </label>
//                  {errors.state && <p>{errors.state}</p>}
//               </div>
//               <div>
//                  <h2>Describe your place to guests</h2>
//                  <h4>
//                     Mention the best features of your space, any special amenities
//                     like fast wifi or parking, and what you love about the
//                     neighborhood
//                  </h4>
//                  <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Please write at least 30 characters"
//                     rows="5"
//                  ></textarea>
//                  {errors.description && <p>{errors.description}</p>}
//               </div>
//               <div>
//                  <h2>Create a title for your spot</h2>
//                  <label>
//                     Catch guests' attention with a spot title that highlights what
//                     makes your place special.
//                     <input
//                        type="text"
//                        value={name}
//                        onChange={(e) => setName(e.target.value)}
//                        placeholder="Name of your spot"
//                     />
//                  </label>
//                  {errors.title && <p>{errors.title}</p>}
//               </div>
//               <div>
//                  <h2>Set a base price for your spot</h2>
//                  <h4>
//                     Competitive pricing can help your listing stand out and rank
//                     higher in search results.
//                  </h4>
//                  <div>
//                     <label>
//                        $
//                        <input
//                           type="number"
//                           value={price}
//                           onChange={(e) => setPrice(e.target.value)}
//                           placeholder="Price per night (USD)"
//                        />
//                     </label>
//                     {errors.price && <p>{errors.price}</p>}
//                  </div>
//               </div>
//               <div>
//                  <h2>Liven up your spot with photos</h2>
//                  <label>
//                     Submit a link to at least one photo to publish your spot.
//                     <input
//                        type="url"
//                        value={previewImg}
//                        onChange={(e) => setPreviewImg(e.target.value)}
//                        placeholder="Preview Image URL"
//                     />
//                  </label>
//                  {errors.previewImg && <p>{errors.previewImg}</p>}
//                  <input
//                     type="url"
//                     value={imgOne}
//                     onChange={(e) => setImgOne(e.target.value)}
//                     placeholder="Image URL"
//                  />
//                  {errors.imgOne && <p>{errors.imgOne}</p>}
//                  <input
//                     type="url"
//                     value={imgTwo}
//                     onChange={(e) => setImgTwo(e.target.value)}
//                     placeholder="Image URL"
//                  />
//                  {errors.imgTwo && <p>{errors.imgTwo}</p>}
//                  <input
//                     type="url"
//                     value={imgThree}
//                     onChange={(e) => setImgThree(e.target.value)}
//                     placeholder="Image URL"
//                  />
//                  {errors.imgThree && <p>{errors.imgThree}</p>}
//                  <input
//                     type="url"
//                     value={imgFour}
//                     onChange={(e) => setImgFour(e.target.value)}
//                     placeholder="Image URL"
//                  />
//                  {errors.imgFour && <p>{errors.imgFour}</p>}
//               </div>
//               <button type="submit">Create spot</button>
//            </form>
//         </>
//      );
//   }

// export default CreateSpotForm;



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
    const [price, setPrice] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [imgOne, setImgOne] = useState("");
    const [imgTwo, setImgTwo] = useState("");
    const [imgThree, setImgThree] = useState("");
    const [imgFour, setImgFour] = useState("");
    const [errors, setErrors] = useState({});
    // const [submit, setSubmit] = useState(false); //submitting
    // const [submitted, setSubmitted] = useState(false); //form submitted

    function errorsChecked (
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
        const object = {}
        if (!country) errors.country = "Country is required";
        if (!address) errors.address = "Address is required";
        if (!city) errors.city = "City is required";
        if (!state) errors.state = "State is required";
        if (description.length < 30) errors.description = "Description needs 30 or more characters";
        if (!name) errors.name = "Name is required";
        if (!price) errors.price = "Price is required";
        if (!previewImg) errors.previewImg = "Preview image is required";
        if (previewImg && !previewImg.endsWith("jpg") && !previewImg.endsWith("jpeg") && !previewImg.endsWith("png")) errors.previewImg = "Image URL must end in .png, .jpg, or .jpeg";
        if (imgOne && !imgOne.endsWith("jpg") && !imgOne.endsWith("jpeg") && !imgOne.endsWith("png")) errors.imgOne = "Image URL must end in .png, .jpg, or .jpeg";
        if (imgTwo && !imgTwo.endsWith("jpg") && !imgTwo.endsWith("jpeg") && !imgTwo.endsWith("png")) errors.imgTwo = "Image URL must end in .png, .jpg, or .jpeg";
        if (imgThree && !imgThree.endsWith("jpg") && !imgThree.endsWith("jpeg") && !imgThree.endsWith("png")) errors.imgThree = "Image URL must end in .png, .jpg, or .jpeg";
        if (imgFour && !imgFour.endsWith("jpg") && !imgFour.endsWith("jpeg") && !imgFour.endsWith("png")) errors.imgFour = "Image URL must end in .png, .jpg, or .jpeg";

        return object;
    }

    // useEffect(() => {
    //     const errors = {}

    //   });

      const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsFound = errorsChecked (
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
        setErrors(errorsFound);

        // if (Object.values(errorsFound).length > 0) {
        //     return null;
        // }

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
            imgFour
        };

        const newSpot = await dispatch(createSpotThunk(payload))
        await dispatch(addSpotImageThunk(newSpot.id, previewImg, true))
        await dispatch(addSpotImageThunk(newSpot.id, imgOne, false))
        await dispatch(addSpotImageThunk(newSpot.id, imgTwo, false))
        await dispatch(addSpotImageThunk(newSpot.id, imgThree, false))
        await dispatch(addSpotImageThunk(newSpot.id, imgFour, false))

        if (newSpot) {
            dispatch(getSingleSpotThunk(newSpot.id));
            history.push(`/spots/${newSpot.id}`);
        }
      };

      return (
        <>
         <div>
            <h1>Create a new Spot</h1>
            <h2>Where's your place located?</h2>
            <h4>
               Guests will only get your exact address once they booked a
               reservation.
            </h4>
         </div>
         <form onSubmit={handleSubmit}>
            <div>
               <label>
                  Country
                  <input
                     type="text"
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
      </>
      )
}

export default CreateSpotForm;

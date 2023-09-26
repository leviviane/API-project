import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpotThunk, addSpotImageThunk } from '../../store/spots';
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
    const [submit, setSubmit] = useState(false); //submitting
    const [submitted, setSubmitted] = useState(false); //form submitted

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
        if (Object.values(errorsFound).length > 0) {
            return null;
        }

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
        await dispatch(addSpotImageThunk(newSpot.id, imgOne, false))
      }
}


export default CreateSpotForm;

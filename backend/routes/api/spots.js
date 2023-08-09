const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models');

//Get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })
    // spots.toJSON()
    // console.log(spots)

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    spotsList.forEach(spot => {
        spot.avgRating = 0
        spot.Reviews.forEach(review => {
            spot.avgRating += review.stars
        })
        spot.avgRating = spot.avgRating / spot.Reviews.length
        delete spot.Reviews
    })

    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                // console.log(image)
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'no preview image found'
        }
        delete spot.SpotImages
    })



    console.log(spotsList)



    res.json(spotsList)
})


module.exports = router;

const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const validateCreateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists( {checkFalsy: true })
      .withMessage('City is required'),
      check('state')
      .exists( {checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists( {checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists( {checkFalsy: true })
      .isNumeric()
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists( {checkFalsy: true })
      .isNumeric()
      .withMessage('Longitude is not valid'),
    check('name')
      .exists( {checkFalsy: true })
      .isLength({min:2, max: 50})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists( {checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists( {checkFalsy: true })
      .isNumeric()
      .withMessage('Price per day is required'),
      handleValidationErrors
  ];



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
    });
    // spots.toJSON()
    // console.log(spots)

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {
        spot.avgRating = 0
        spot.Reviews.forEach(review => {
            spot.avgRating += review.stars
        })
        spot.avgRating = spot.avgRating / spot.Reviews.length
        delete spot.Reviews
    });



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
    });
    console.log(spotsList)

    res.json(spotsList)
});

//get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const spots = await Spot.findAll({
        where: {
            ownerId: userId
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    });
    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON())
    });
    Spots.forEach(spot => {
        spot.avgRating = 0
        spot.Reviews.forEach(review => {
            spot.avgRating += review.stars
        })
        spot.avgRating = spot.avgRating / spot.Reviews.length
        delete spot.Reviews
    });

    Spots.forEach(spot => {
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
    });
    // return res.status(200).json({ Spots: spots})
    res.json({Spots})
});
// router.get('/current', requireAuth, async (req, res) => {
//     // let user = await User.findByPk(req.user.id)
//     const userId = req.user.id

//     const spots = await Spot.findAll({
//         where: {
//             ownerId: userId
//         },
//         include: [Review, SpotImage]
//     })
//     let vacationSpots = [];
//     spots.forEach(spot => {
//         vacationSpots.push(spot.toJSON())
//     })
//     vacationSpots.forEach(spot => {
//         spot.avgRating = 0
//         spot.Reviews.forEach(review => {
//             spot.avgRating += review.stars
//         })
//         spot.avgRating = spot.avgRating / spot.Reviews.length
//         delete spot.Reviews
//     })

//     vacationSpots.forEach(spot => {
//         spot.SpotImages.forEach(image => {
//             if (image.preview === true) {
//                 // console.log(image)
//                 spot.previewImage = image.url
//             }
//         })
//         if (!spot.previewImage) {
//             spot.previewImage = 'no preview image found'
//         }
//         delete spot.SpotImages
//     })
// })


//get details of a spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id;

    let spot = await Spot.findOne({
        where: {
            id: spotId
        },
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review,
                attributes: ['stars']
            }]
    });
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    spot = spot.toJSON()
    spot.Owner = spot.User

    const numReviews = spot.Reviews.length
    spot.numReviews = numReviews
    let starRatings = 0;

    for (const review of spot.Reviews) {
        starRatings += review.stars;
    }
    let avgStarRating = 0

    if (numReviews > 0) { avgStarRating = starRatings / numReviews}
    spot.avgStarRating = avgStarRating
    //res.json(spot)
    delete spot.Reviews
    delete spot.User

        res.json(spot)
    });

    // return res.status(200).json({ //per franco, can pass in res.json
    //     id: spot.id,
    //     ownerId: spot.ownerId,
    //     address: spot.address,
    //     city: spot.city,
    //     state: spot.state,
    //     country: spot.country,
    //     lat: spot.lat,
    //     lng: spot.lng,
    //     name: spot.name,
    //     description: spot.description,
    //     price: spot.price,
    //     createdAt: spot.createdAt,
    //     updatedAt: spot.updatedAt,
    //     numReviews: numReviews,
    //     avgRating: avgStarRating,
    //     SpotImages: spot.SpotImages,
    //     User: spot.User
    // });

//create a spot
router.post('/', requireAuth, validateCreateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    // const ownerId = req.user.id
    const createSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    res.json(createSpot)
});

//Add an image to a spot based on spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const user = await User.findByPk(req.user.id);
    const { url, preview } = req.body;

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

    if (spot) {
      if (spot.ownerId === user.id) {
        const spotImage = await SpotImage.create({
          spotId: req.params.spotId,
          url,
          preview,
        });
        return res.json({
          id: spotImage.id,
          url: spotImage.url,
          preview: spotImage.preview,
        });
    }
    }
  });

// router.post('/:spotId/images', requireAuth, async (req, res) => {
//     const { user } = req
//     const spot = req.params.spotId

//     const spot = await Spot.findByPk(spot)
//     if (!spot) {
//         if (user.id !== spot.ownerId) {
//             return res.status(404).json({ message: "Spot couldn't be found" })
//         }
//     }
//     if (user.id !== spot.ownerId) {
//         return res.status(403).json({ message: "Spot does not exist with id" })
//     }
//     const addImage = await SpotImage.create({
//         spotId,
//         url,
//         preview
//     })
//     let addedImage = {
//         id: addImage.id,
//         url: addImage.url,
//         preview: addImage.preview
//     }
//     res.json(addedImage)

//Edit a spot
router.put('/:spotId', requireAuth, validateCreateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    let spot = await Spot.findByPk(req.params.spotId)

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    const editSpot = await spot.update({
        address, city, state, country, lat, lng, name, description, price
    })
    res.json(editSpot)
})



module.exports = router;

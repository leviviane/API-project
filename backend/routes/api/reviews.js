const express = require('express');
const router = express.Router();
const { Spot, SpotImage, User, Review, ReviewImage, Bookings } = require('../../db/models');
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { requireAuth } = require('../../utils/auth');

const validateReview = [
    check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check("stars")
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .isNumeric()
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
  ];

//Get all reviews of the current user
router.get('/current', requireAuth, async(req, res) => {
    let user = await User.findByPk(req.user.id)
    const reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                include: [{ model: SpotImage }],
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    let reviewsList = [];
    reviews.forEach((review) => {
        reviewsList.push(review.toJSON())
    })
    reviewsList.forEach((review) => {
        review.Spot.SpotImages.forEach((image) => {
            if (image.preview === true) {
                //console.log(image)
                review.Spot.previewImage = image.url
            }
        })
        delete review.Spot.SpotImages
    })
    res.json({ Reviews: reviewsList })
});

//Add an image to a review based on the reviews id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    const user = await User.findByPk(req.user.id)
    const { url } = req.body;

    if(!review) {
        return res.status(404).json({ message: "Review couldn't be found"})
    }

    if (review) {
        if (review.userId === user.id) {
            const reviewImage = await ReviewImage.create({
                reviewId: req.params.reviewId,
                url
            })
            return res.json({
                id: reviewImage.id,
                url: reviewImage.url
            })
        }
    }
})


// router.post('/:reviewId/images', requireAuth, async (req, res) => {
//     const review = await Review.findByPk(req.params.reviewId);
//     const user = await User.findByPk(req.user.id)
//     const { url }  = req.body

//     if (review) {
//         if (review.ownerId === user.id) {
//             const reviewImage = await reviewImage.create({
//                 reviewId: req.params.reviewId,
//                 id,
//                 url
//             })
//             return res.json({
//                 id: reviewImage.id,
//                 url: reviewImage.url
//             })
//         }
//     }
// })

//edit a review //!! check error message
router.put('/:reviewsId', validateReview, requireAuth, async (req, res)=> {
    const editReview = await Review.findByPk(req.params.reviewsId);
    const user = await User.findByPk(req.user.id);

    if (editReview) {
        if (editReview.userId === user.id) {
            const { review, stars } = req.body

            await editReview.update({
                review,
                stars
            })
        } else {
            res.status(404).json({ message: "Review couldn't be found"})
        }
    }
    res.json(editReview)
})


//delete a review
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const reviewId = req.params.reviewId

    let review = await Review.findByPk(reviewId)

    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" })
    }

    await review.destroy()
    return res.status(200).json({ message: "Successfully deleted" })
})

module.exports = router;

const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//Delete a spot image
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const reviewId = req.params.reviewId;

    let image = await ReviewImage.findByPk(reviewId)

    if (!image) {
        return res.status(404).json({ message: "Review Image couldn't be found" })
    }

    await image.destroy()
    return res.status(200).json({ message: "Successfully deleted" })
})

module.exports = router;

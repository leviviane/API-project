const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

//Delete a spot image
router.delete('/:imageId', requireAuth, async(req, res) => {
    const imageId = req.params.imageId;

    let image = await SpotImage.findByPk(imageId)

    if (!image) {
        return res.status(404).json({ message: "Spot Image couldn't be found" })
    }

    await image.destroy()
    return res.status(200).json({ message: "Successfully deleted" })
})

module.exports = router;


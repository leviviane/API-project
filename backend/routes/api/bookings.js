const express = require('express');
const router = express.Router();
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { requireAuth } = require('../../utils/auth');

//Get all current users bookings
router.get('/current', requireAuth, async(req, res) => {
    let user = await User.findByPk(req.user.id)
    const bookings = await Booking.findAll({
        where: { userId: user.id },
        include: [
            {
                model: Spot,
                include: [{ model: SpotImage }],
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            }
        ]
    })
    let bookingsList = [];
    bookings.forEach((booking) => {
        bookingsList.push(booking.toJSON())
    })
    bookingsList.forEach((booking) => {
        booking.Spot.SpotImages.forEach((image) => {
            if (image.preview === true) {
                //console.log(image)
                booking.Spot.previewImage = image.url
            }
        })
        delete booking.Spot.SpotImages
        // delete booking.userId
    })
    res.json({ Bookings: bookingsList })
})



module.exports = router;

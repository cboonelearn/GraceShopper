const express = require('express');
const router = express.Router();
const { Guests } = require('../db');

// GET /api/product
router.get('/', async(req, res, next) => {
    try {
        const guests = await Guests.getAllGuests();

        res.send(guests)
    } catch (error) {
        console.error(error)
    }
})

// GET /api/guest/:guestId
router.get('/:guestId', async(req, res, next) => {
    try {
        const { guestId } = req.params;
        
        let guest = await Guests.getGuestById({ id: guestId })

        res.send(guest)

    } catch (error) {
        console.error(error)
    }
})

module.exports = router;
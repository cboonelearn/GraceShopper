const express = require('express');
const router = express.Router();
const { Photos } = require('../db');

// GET /api/photo
router.get('/', async(req, res, next) => {
    try {
        const photos = await Photos.getAllPhotos();

        res.send(photos)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// POST /api/photo
router.post('/', async(req, res, next) => {
    try {
        const { description, link, productId } = req.body;
        const newPhoto = await Photos.createPhoto({ description, link, productId });

        res.send(newPhoto)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// PATCH /api/photo/:photoId
router.patch('/:photoId', async(req, res, next) => {
    try {
        const { photoId } = req.params;

        const { description, link, productId } = req.body;
        const updatedPhoto = await Photos.updatePhoto({ id: photoId, description: description, link: link, productId: productId })
        res.send(updatedPhoto)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// DELETE /api/photo/:photoId
router.delete('/:photoId', async(req, res, next) => {
    try {
        const { photoId } = req.params;
        const deletedPhoto = await Photos.deletedPhoto({ id: photoId });

        res.send(deletedPhoto)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router;
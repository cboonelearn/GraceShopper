const express = require('express');
const router = express.Router();
const { Product } = require('../db');

// GET /api/product
router.get('/', async(req, res, next) => {
    try {
        const products = await Product.getAllProducts();

        res.send(products)
    } catch (error) {
        console.error(error)
    }
})

// GET /api/product/:productid
router.get('/:productId', async(req, res, next) => {
    try {
        const { productId } = req.params;

        let product = await Product.getProductById({ id: productId })

        res.send(product)

    } catch (error) {
        console.error(error)
    }
})


// ADMIN ROUTES*************************************************

// POST /api/product
router.post('/', async(req, res, next) => {
    try {
        // if (!req.user) {
        //     throw new Error(`You must be logged in to perform this action`)
        // }

        const { name, description, price, qtyAvailable, category } = req.body
        const newProduct = await Product.createProduct({ name, description, price, qtyAvailable, category});

        res.send(newProduct)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// PATCH *UPDATE PRICE OF PRODUCT*


// DELETE /api/product/:productId
router.delete('/:productId', async(req, res, next) => {
    try {
        // if (!req.user) {
        //     throw new Error(`You must be logged in to perform this action`)
        // }

        const { productId } = req.params
        const deletedProduct = await Product.deleteProduct({ id: productId})

        res.send(deletedProduct)
    } catch (error) {
        console.error(error)
        next(error)
    }
})


module.exports = router;
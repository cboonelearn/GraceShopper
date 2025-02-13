const express = require('express');
const router = express.Router();
const { Orders } = require('../db');

// GET /api/order
router.get('/', async(req, res, next) => {
    try {
        const users = await Orders.getAllOrders();

        res.send(users)
    } catch (error) {
        console.error(error)
    }
})

// GET /api/order/:orderId
router.get('/:orderid', async(req, res, next) => {
    try {
        const { orderid } = req.params;

        const order = await Orders.getOrderById({ id:orderid })

        res.send(order)

    } catch (error) {
        console.error(error)
    }
})

// GET /api/order/user/userId
router.get('/user/:userid', async(req, res, next) => {
    try {
        const { userid } = req.params;

        const order = await Orders.getOrdersByUser(userid)

        res.send(order)

    } catch (error) {
        console.error(error)
    }
})

// POST /api/order/
router.post('/', async(req, res, next) => {
    try {
        const { isUserId, isGuestId } = req.body

        const newOrder = await Orders.createOrderFromCart({ isUserId, isGuestId })

        res.send(newOrder)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// DELETE /api/order/:orderId
router.delete('/:orderId', async(req, res, next) => {
    try {
        const { orderId } = req.params

        const deletedOrder = Orders.deleteOrder({ orderId })

        res.send(deletedOrder)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// GET /api/order/user/:userId
router.get('/user/:userId', async(req, res, next) => {
    try {
        const { userId } = req.params

        const order = await Orders.getOrdersByUser(userId)

        res.send(order)

    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router;
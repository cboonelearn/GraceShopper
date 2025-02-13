const express = require('express');
const userRouter = express.Router();
const { Users } = require('../db');
const bcrypt = require('bcrypt');

// POST /api/user/login
userRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next({
            name: "MissingCredientialsError",
            message: "Please supply both an email and password"
        });
    }

    try {
        const user = await Users.getUserByEmail(email);
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (user&&passwordsMatch) {
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
            delete user.password;
            res.send({ user: user, message: "you're logged in!", token: token });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Email or password is incorrect'
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// POST /api/user/register
userRouter.post('/register', async (req, res, next) => {
    const { email, password } = req.body;
    const jwt = require('jsonwebtoken');
    try {
        const _user = await Users.getUserByEmail(email);
        if(_user) { 
            next({
                name: 'UserExistsError',
                message: `Email ${email} has already been registered.`
            });
        }

        if(password.length<5) {
            next({
                name: 'PasswordTooShortError',
                message: 'Password Too Short!'
            })
        }

        const user = await Users.createUser({
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: "thank you for signing up",
            token: token,
            user: user
        });
    } catch ({ name, message }) {
        next({ name, message })
    }
});

// GET /api/user
userRouter.get('/', async(req, res, next) => {
    try {
        const users = await Users.getAllUsers();

        res.send(users)
    } catch (error) {
        console.error(error)
    }
})

// GET /api/user/:userId
userRouter.get('/:userId', async(req, res, next) => {
    try {
        const { userId } = req.params;

        let user = await Users.getUserById({ id: userId })

        res.send(user)

    } catch (error) {
        console.error(error)
        next(error)
    }
})

// PATCH /api/user/:userId
userRouter.patch('/:userId', async(req, res, next) => {
    try {
        const { userId } = req.params;

        const { email, password } = req.body;    

        const updatedUser = await Users.updateUser({ id: userId, email, password });

        res.send(updatedUser);

    } catch (error) {
        console.error(error)
        next(error)
    }
})


// ADMIN ROUTES
// PATCH /api/user/makeAdmin/:userId *MAKE OTHER USER ADMIN*
userRouter.patch('/makeAdmin/:userId', async(req, res, next) => {
    try {
        const { userId } = req.params;

        let selectedUser = await Users.getUserById({ id: userId });
        let selectedUserEmail = selectedUser.email;

        let newAdmin = await Users.makeAdmin({ email: selectedUserEmail })

        res.send(newAdmin)

    } catch (error) {
        console.error(error)
        next(error)
    }
})

// PATCH /api/user/removeAdmin/:userId *REMOVE OTHER USER ADMIN*
userRouter.patch('/removeAdmin/:userId', async(req, res, next) => {
    try {
        const { userId } = req.params;

        let selectedUser = await Users.getUserById({ id: userId });
        let selectedUserEmail = selectedUser.email;

        let lostAdmin = await Users.removeAdmin({ email: selectedUserEmail })

        res.send(lostAdmin)

    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = userRouter;
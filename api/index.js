const jwt = require("jsonwebtoken");
const { User, Guest } = require("../db");
const { JWT_SECRET } = process.env;

const express = require("express");
const apiRouter = express.Router();
apiRouter.use(express.json());
const cors = require("cors");
apiRouter.use(cors());

// USE THIS BLOCK IF WE DO AUTHENTICATION THROUGH HEADERS
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await User.getUserById({ id: id });
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});


apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// apiRouter.get("/user", (req,res,next) => {
//   res.send({
//     user: true,
//   });
// });

// ROUTER: /api/user
const userRouter = require("./users");
apiRouter.use("/users", userRouter);

//ROUTER: /api/product
const productRouter = require("./products");
apiRouter.use("/products", productRouter);

//ROUTER: /api/order
const orderRouter = require("./orders");
apiRouter.use("/orders", orderRouter);

//ROUTER: /api/photo
const photoRouter = require("./photos");
apiRouter.use("/photos", photoRouter);

//ROUTER: /api/review
const reviewRouter = require("./reviews");
apiRouter.use("/reviews", reviewRouter);

//ROUTER: /api/guest
const guestRouter = require("./guests");
apiRouter.use("/guests", guestRouter);

//ROUTER: /api/cart
const cartRouter = require("./carts");
apiRouter.use("/carts", cartRouter);

apiRouter.use("*", function (req, res, next) {
  res.status(404).send({ message: "Route could not be found" });
});

apiRouter.use((error, req, res, next) => {
  res.send({
    error: "There was an error",
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;

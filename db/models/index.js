module.exports = {
  // add each model to your exports object here
  // so that you can use them in your express server api routers
  // for example, create a users.js file for a User model
  // and User: require('./user') here
  Users: require('./users'),
  Products: require('./products'),
  Reviews: require('./reviews'),
  Guests: require('./guests'),
  Orders: require('./orders'),
  Photos: require('./photos'),
  Carts: require('./carts'),

};

// then, in your API, you'll require the appropriate model
// and use its database connectors
// ie User.getUserById(), where user.js had a module.exports
// that looked like this: module.exports = { getUserById, ... }

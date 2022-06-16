const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

// gives the comments routes
router.use('/comments', commentRoutes);
// gives the /pizzas prefix to routes created in the pizza-routes.js file
router.use('/pizzas', pizzaRoutes);

module.exports = router;

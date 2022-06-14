const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// gives the /pizzas prefix to routes created in the pizza-routes.js file
router.use('/pizzas', pizzaRoutes);

module.exports = router;

const router = require('express').Router();
// Destructures all of the routes allowing them to be called directly 
const { getAllPizza, getPizzaById, createPizza, updatePizza, deletePizza } = require('../../controllers/pizza-controller');

// Sets up the GET all and the POST values at /api/pizzas
router
.route('/')
.get(getAllPizza)
.post(createPizza);

// Set up the GET, PUT, and DELETE values at /api/pizzas/:id
router.route('/:id')
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router;
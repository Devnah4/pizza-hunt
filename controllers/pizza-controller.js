const { Pizza } = require('../models');

const pizzaController = {
    // Get all the pizzas
    getAllPizza(req, res) {
        // Uses Mongoose find() method to get all the pizzas
        Pizza.find({})
            // populate will generate the actual content of comments when the dat for piza is pulled
            .populate({
                path: 'comments',
                // States that we do not want the __v content from comments
                // the - denotes we don't want otherwise it would only pull __v
                select: '-__v'
            })
            .select('-__v')
            // This will sort the object in DESC order
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get a single pizza by using the id
    getPizzaById({ params }, res) {
        // Uses Mongoose findOne() method
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                // If no pizza is found, send a 404 error
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza was found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Create a new pizza using the POST method
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // Update a pizza by using the id
    updatePizza({ params, body }, res) {
        // requires new: true to return the new document instead of the old one
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true  })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza was found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete a pizza by using the id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza was found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;
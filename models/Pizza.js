const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        // Uses MongoDB and Mongoose to set type 
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        // Sets the default created value to the current date
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    // The [] represents an array, which can be used as well
    toppings: []
});

// Creates the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// Exports the pizza model
module.exports = Pizza
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
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            // Tells Pizza which document to search for
            ref: 'Comment'
        }
    ]
},
{
    // States that a virtual is used
    toJSON: {
        virtuals: true,
    },
    id: false
});

// Gets the total number of comments for a pizza
PizzaSchema.virtual('commentCount').get(function() {
    // returns the amount of comments in the array
    return this.comments.length;
});

// Creates the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// Exports the pizza model
module.exports = Pizza
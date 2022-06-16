const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
        // Uses MongoDB and Mongoose to set type 
        type: String, 
        // Makes the pizzaName required
        // Can also provide a text message to the user if the pizzaName is not provided
        required: true,
        // Removes the whitespace before and after the input
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        // Sets the default created value to the current date
        default: Date.now,
        // Converts it to a new format using the util functions
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        // enumerable
        // Creates an array that can be iterated through
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
        getters: true
    },
    id: false
});

// Gets the total number of comments for a pizza
PizzaSchema.virtual('commentCount').get(function() {
    // returns the amount of comments in the array
    // Now it does math to add the values together for comments and replies
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// Creates the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// Exports the pizza model
module.exports = Pizza
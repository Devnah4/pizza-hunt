// Imports the model info
const { Comment, Pizza } = require('../models');

// Sets up the comment object
const commentController = {
    // Adds a comment value
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({ _id }) => {
            return Pizza.findOneAndUpdate(
                // Finds the pizza with the id
                { _id: params.pizzaId },
                // Updates the pizza with the comment id
                { $push: { comments: _id } },
                // Returns the updated pizza
                { new: true }
            );
        })
        .then(dbPizzaData => {
            // Checks if the za was found
            if (!dbPizzaData) {
                // sends error code if none found
                res.status(404).json({ message: 'No Pizza found with that id!' });
                return;
            }
            // Otherwise it will send the data
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    // Removes a comment value
    removeComment({ params }, res) {
        // Finds the pizza with the id
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
            // Checks if the comment was found
            if (!deletedComment) {
                // sends error code if none found
                return res.status(404).json({ message: 'No comment with that id!' });
            }
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                { $pull: { comments: params.commentId } },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No Pizza found with that id!' });
                return;
            }
            res.json(dbPizzaData)
        })
        .catch(err => res.json(err));
    }
};

module.exports = commentController
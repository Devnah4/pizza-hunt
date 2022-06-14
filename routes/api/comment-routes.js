const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// Sets the route for adding a comment
//  /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// Sets the route for the removal of a comment from a specific pizza
//  /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;
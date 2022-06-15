const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// Sets the route for adding a comment
//  /api/comments/<pizzaId>
router.route('/:pizzaId')
.post(addComment);

// Sets route for the addition of a reply
// Sets the route for the removal of a comment from a specific pizza
//  /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId')
.put(addReply)
.delete(removeComment);

// Sets the route to DELETE a reply
router.route('/:pizzaId/:commentId/:replyId')
.delete(removeReply);

module.exports = router;
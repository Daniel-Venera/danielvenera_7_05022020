const auth = require("../middleware/auth");
module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    // Create a new comment
    app.post("/posts/:postId/comments", comments.create);
    // Retrieve all comments
    app.get("/posts/:postId/comments", comments.findAll);
    app.get("/users/:userId/comments", comments.findAllByUserId);
    app.get("/posts/comments/validation", comments.findAllToValidate);
    app.get("/posts/comments/admin", comments.findAllAdmin);
    app.get("/posts/:postId/comments/validation", comments.findAllToValidateByPostId);
    app.put("/posts/:postId/comments/:commentId/validation", comments.validate);
    // Retrieve a single comment with commentId
    app.get("/posts/:postId/comments/:commentId", comments.findOne);
    // Update a comment with commentId
    app.put("/posts/:postId/comments/:commentId", comments.update);
    // Delete a comment with commentId
    app.delete("/posts/:postId/comments/:commentId", comments.delete);
    // Create a new comment
    app.delete("/posts/:postId/comments", comments.deleteAll);
};

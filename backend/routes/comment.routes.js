const auth = require("../middleware/auth");
module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    // Create a new comment
    app.post("/posts/:postId/comments", auth, comments.create);
    // Retrieve all comments
    app.get("/posts/:postId/comments", auth, comments.findAll);
    app.get("/users/:userId/comments", auth, comments.findAllByUserId);
    app.get("/posts/comments/validation", auth, comments.findAllToValidate);
    app.get("/posts/comments/admin", auth, comments.findAllAdmin);
    app.get("/posts/:postId/comments/validation", auth, comments.findAllToValidateByPostId);
    app.put("/posts/:postId/comments/:commentId/validation", auth, comments.validate);
    // Retrieve a single comment with commentId
    app.get("/posts/:postId/comments/:commentId", auth, comments.findOne);
    // Update a comment with commentId
    app.put("/posts/:postId/comments/:commentId", auth, comments.update);
    // Delete a comment with commentId
    app.delete("/posts/:postId/comments/:commentId", auth, comments.delete);
    // Create a new comment
    app.delete("/posts/:postId/comments", auth, comments.deleteAll);
};

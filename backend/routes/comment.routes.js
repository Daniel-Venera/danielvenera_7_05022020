var auth = require("../middleware/auth");
module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    // Create a new comment
    app.post("/posts/:postId/comments", comments.create);
    // Retrieve all comments
    app.get("/posts/:postId/comments", comments.findAll);
    // Retrieve a single comment with commentId
    app.get("/posts/:postId/comments/:commentId", comments.findOne);
    // Update a comment with commentId
    app.put("/posts/:postId/comments/:commentId", comments.update);
    // Delete a comment with commentId
    app.delete("/posts/:postId/comments/:commentId", comments.delete);
    // Create a new comment
    app.delete("/posts/:postId/comments", comments.deleteAll);
};

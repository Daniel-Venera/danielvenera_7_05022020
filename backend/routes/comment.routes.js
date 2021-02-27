module.exports = app => {
  const comments = require("../controllers/comment.controller.js");
  // Create a new comment
  app.post("/posts/:post_id/comments", comments.create);
  // Retrieve all comments
  app.get("/posts/:post_id/comments", comments.findAll);
  // Retrieve a single comment with commentId
  app.get("/posts/:post_id/comments/:commentId", comments.findOne);
  // Update a comment with commentId
  app.put("/posts/:post_id/comments/:commentId", comments.update);
  // Delete a comment with commentId
  app.delete("/posts/:post_id/comments/:commentId", comments.delete);
  // Create a new comment
  app.delete("/posts/:post_id/comments", comments.deleteAll);
};
const multer = require("../middleware/multer-config");
module.exports = app => {
  const posts = require("../controllers/post.controller.js");
  // Create a new post
  app.post("/posts", multer, posts.create);
  // Retrieve all posts
  app.get("/posts", posts.findAll);
  // Retrieve a single post with postId
  app.get("/posts/:postId", posts.findOne);
  // Update a post with postId
  app.put("/posts/:postId", posts.update);
  // Delete a post with postId
  app.delete("/posts/:postId", posts.delete);
  // Create a new post
  app.delete("/posts", posts.deleteAll);
};
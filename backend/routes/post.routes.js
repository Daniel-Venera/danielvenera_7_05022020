const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
module.exports = app => {
    const posts = require("../controllers/post.controller.js");
    // Create a new post
    app.post("/posts", auth, multer, posts.create);
    // Retrieve all posts
    app.get("/posts", auth, posts.findAll);
    app.get("/posts/validation", auth, posts.findAllToValidate);
    // Retrieve a single post with postId
    app.get("/posts/:postId", auth, posts.findOne);
    // Retrieve all post with User
    app.get("/posts/user/:userId", auth, posts.findOneById);
    // Update a post with postId
    app.put("/posts/:postId", auth, multer, posts.update);
    app.put("/posts/:postId/validation", auth, multer, posts.validate);
    // Delete a post with postId
    app.delete("/posts/:postId", auth, posts.delete);
    // Create a new post
    app.delete("/posts", auth, posts.deleteAll);
};

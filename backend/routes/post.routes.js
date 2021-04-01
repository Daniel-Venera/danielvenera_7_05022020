// const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
module.exports = app => {
    const posts = require("../controllers/post.controller.js");
    // Create a new post
    app.post("/posts", multer, posts.create);
    // Retrieve all posts
    app.get("/posts", auth, posts.findAll);
    app.get("/posts/validation", posts.findAllToValidate);
    // Retrieve a single post with postId
    app.get("/posts/:postId", posts.findOne);
    // Retrieve all post with User
    app.get("/posts/user/:userId", posts.findOneById);
    // Update a post with postId
    app.put("/posts/:postId", multer, posts.update);
    app.put("/posts/:postId/validation", multer, posts.validate);
    // Delete a post with postId
    app.delete("/posts/:postId", posts.delete);
    // Create a new post
    app.delete("/posts", posts.deleteAll);
};

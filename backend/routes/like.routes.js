const auth = require("../middleware/auth");
module.exports = app => {
    const likes = require("../controllers/like.controller.js");
    app.post("/posts/:postId/likes", auth, likes.create);
    app.get("/posts/:postId/likes", auth, likes.findAll);
    app.get("/posts/likes/admin", auth, likes.findAllAdmin);
    app.get("/users/:userId/likes", auth, likes.findAllByUserId);
    app.get("/posts/:postId/likes/:likeId", auth, likes.findOne);
    app.delete("/posts/:postId/likes/user/:userId", auth, likes.deleteOne);
    app.delete("/posts/:postId/likes/:likeId", auth, likes.delete);
};

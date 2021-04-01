// const auth = require("../middleware/auth");
module.exports = app => {
    const likes = require("../controllers/like.controller.js");
    app.post("/posts/:postId/likes", likes.create);
    app.get("/posts/:postId/likes", likes.findAll);
    app.get("/posts/likes/admin", likes.findAllAdmin);
    app.get("/users/:userId/likes", likes.findAllByUserId);
    app.get("/posts/:postId/likes/:likeId", likes.findOne);
    app.delete("/posts/:postId/likes/user/:userId", likes.deleteOne);
    app.delete("/posts/:postId/likes/:likeId", likes.delete);
};

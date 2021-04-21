const auth = require("../middleware/auth");
module.exports = app => {
    const users = require("../controllers/user.controller.js");
    // Create a new user
    app.post("/users", users.create);
    // Retrieve all users
    app.get("/users", auth, users.findAll);
    app.get("/users/validation", auth, users.findAllToValidate);
    // Retrieve a single user with userId
    app.get("/users/:userId", auth, users.findOne);
    // Update a user with userId
    app.put("/users/:userId", auth, users.update);
    app.put("/users/:userId/validation", auth, users.validate);
    // Delete a user with userId
    app.delete("/users/:userId", auth, users.delete);
    // Create a new user
    app.delete("/users", auth, users.deleteAll);
    //Login user
    app.post("/login", users.login);
};

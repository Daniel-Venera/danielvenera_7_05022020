const auth = require("../middleware/auth");
module.exports = app => {
    const users = require("../controllers/user.controller.js");
    // Create a new user
    app.post("/users", users.create);
    // Retrieve all users
    app.get("/users", users.findAll);
    app.get("/users/validation", users.findAllToValidate);
    // Retrieve a single user with userId
    app.get("/users/:userId", users.findOne);
    // Update a user with userId
    app.put("/users/:userId", users.update);
    app.put("/users/:userId/validation", users.validate);
    // Delete a user with userId
    app.delete("/users/:userId", users.delete);
    // Create a new user
    app.delete("/users", users.deleteAll);
    // Authentificate user
    // app.post('/auth', users.authentification);
    //Login user
    app.post("/login", users.login);
};

const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
var passwordValidator = require("password-validator");
var mailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
var schema = new passwordValidator();
schema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces();
// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Verify all inputs
    if (req.body.user_first_name.length > 50) {
        return res.status(400).json({ error: "Votre prénom doit contenir 50 caractères maximum" });
    } else if (req.body.user_last_name.length > 50) {
        return res.status(400).json({ error: "Votre nom doit contenir 50 caractères maximum" });
    } else if (req.body.user_job.length > 100) {
        return res.status(400).json({ error: "Votre poste doit contenir 100 caractères maximum" });
    } else if (req.body.user_state > 3) {
        return res.status(400).json({ error: "Une erreur est apparue" });
    } else if (!schema.validate(req.body.user_password)) {
        return res.status(400).json({ error: "Mot de passe non conforme : Votre mot doit contenir au moins 8 caractères avec une majuscule, une minuscule, 2 chiffres et aucun espace" });
    } else if (schema.validate(req.body.user_password)) {
        if (mailRegex.test(req.body.user_email)) {
            bcrypt
                .hash(req.body.user_password, 10)
                .then(hash => {
                    const user = new User({
                        user_first_name: req.body.user_first_name,
                        user_last_name: req.body.user_last_name,
                        user_job: req.body.user_job,
                        user_email: req.body.user_email,
                        user_password: hash,
                        user_state: 0
                    });
                    User.create(user, (err, data) => {
                        if (err)
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the User."
                            });
                        else res.send(data);
                    });
                })
                .catch(error => {
                    res.status(500).json({ error });
                });
        } else {
            return res.status(400).json({ error: "Email non conforme" });
        }
    }
};
// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};
// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body.user_password);
    bcrypt
        .hash(req.body.user_password, 10)
        .then(hash => {
            console.log(hash);
            User.updateById(req.params.userId, new User({ ...req.body, user_password: hash }), (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found User with id ${req.params.userId}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating User with id " + req.params.userId
                        });
                    }
                } else res.send(data);
            });
        })
        .catch(error => {
            res.status(500).json({ error: "erreur" });
        });
};
// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.userId
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};
// Delete all users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all users."
            });
        else res.send({ message: `All Users were deleted successfully!` });
    });
};
exports.login = (req, res) => {
    console.log(req.body);
    if (!req.body.user_email) {
        res.status(400).send({
            error: "Vous devez rentrer un email!"
        });
    }
    if (!req.body.user_password) {
        res.status(400).send({
            error: "Vous devez rentrer un mot de passe!"
        });
    }
    User.login(req.body.user_email, (err, user) => {
        console.log("user :");
        console.log(user);
        if (err) {
            if (err.kind == "user_state_0") {
                res.status(401).send({
                    error: err.message || "Ce compte est en cours de validation par l'administrateur. Si c'est bien votre compte, vous devriez recevoir un email de validation dans les prochains jours"
                });
            }
            if (err.kind == "not_found") {
                res.status(401).send({
                    error: err.message || "Ce compte n'existe pas."
                });
            }
        } else {
            bcrypt
                .compare(req.body.user_password, user.user_password)
                .then(valid => {
                    console.log("debut bcrypt");
                    if (!valid) {
                        console.log("mot de passe invalide");
                        res.status(401).json({
                            error: "Mot de passe incorrect"
                        });
                        return;
                    }
                    console.log("milieu bcrypt");
                    res.status(200).json({
                        userId: user.user_id,
                        token: jwt.sign({ userId: user.user_id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" })
                    });
                    // res.redirect("/");
                    console.log("fin bcrypt");
                })
                .catch(error => res.status(500).json({ error }));
        }
    });
};

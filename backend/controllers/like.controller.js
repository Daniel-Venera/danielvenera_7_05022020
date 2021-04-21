const Like = require("../models/like.model.js");
// Create and Save a new like
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
    }
    // Create a like
    const like = new Like({
        user_id: req.body.user_id,
        post_id: req.params.postId,
        like_state: req.body.like_state
    });
    // Save like in the database
    Like.create(like, (err, data) => {
        if (err) {
            if (err.kind == "user_not_found") {
                res.status(401).send({
                    error: err.message || `Il n'existe aucun user avec l'id ${like.user_id}`
                });
            }
            if (err.kind == "post_not_found") {
                res.status(401).send({
                    error: err.message || `Il n'existe aucun article avec l'id ${like.post_id}`
                });
            }
            if (err.kind == "already_liked") {
                res.status(401).send({
                    error: err.message || `L'article ${like.post_id} a déjà été liké par l'utilisateur ${like.user_id}`
                });
            }
        } else {
            res.send(data);
        }
    });
};
// Retrieve all likes from the database.
exports.findAll = (req, res) => {
    Like.getAll(req.params.postId, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving likes."
            });
        else res.send(data);
    });
};
exports.findAllByUserId = (req, res) => {
    Like.getAllByUserId(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving likes."
            });
        else res.send(data);
    });
};
// Find a single like with a likeId
exports.findOne = (req, res) => {
    Like.findById(req.params.postId, req.params.likeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found like with id ${req.params.likeId}.`
                });
            }
            if (err.kind === "post_not_found") {
                res.status(404).send({
                    message: `Not found like with id ${req.params.likeId} and post_id ${req.params.postId}.`
                });
            }
        } else res.send(data);
    });
};
// Delete a like with the specified likeId in the request
exports.delete = (req, res) => {
    Like.remove(req.params.postId, req.params.likeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found like with id ${req.params.likeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete like with id " + req.params.likeId
                });
            }
        } else res.send({ message: `le like a été supprimé avec succès!` });
    });
};
exports.deleteOne = (req, res) => {
    Like.removeOne(req.params.postId, req.params.userId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Could not delete like "
            });
        } else res.send({ message: `le like a été supprimé avec succès!` });
    });
};
exports.findAllAdmin = (req, res) => {
    Like.getAllAdmin((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving likes."
            });
        else res.send(data);
    });
};

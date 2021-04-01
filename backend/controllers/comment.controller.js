const Comment = require("../models/comment.model.js");
// Create and Save a new comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
    }
    // VERIFICATION INPUTS
    if (!req.body.comment_state) {
        return res.status(400).json({ error: "Une erreur est apparue" });
    }
    if (req.body.comment_content.length > 3000) {
        return res.status(400).json({ error: "Le titre doit contenir 3000 caractères maximum" });
    }
    // Create a comment
    const comment = new Comment({
        user_id: req.body.user_id,
        post_id: req.params.postId,
        comment_content: req.body.comment_content,
        comment_state: req.body.comment_state
    });
    // Save comment in the database
    Comment.create(comment, (err, data) => {
        if (err) {
            if (err.kind == "user_not_found") {
                res.status(401).send({
                    error: err.message || `Il n'existe aucun user avec l'id ${comment.user_id}`
                });
            }
            if (err.kind == "post_not_found") {
                res.status(401).send({
                    error: err.message || `Il n'existe aucun article avec l'id ${comment.post_id}`
                });
            }
        } else {
            res.send(data);
        }
    });
};
// Retrieve all comments from the database.
exports.findAll = (req, res) => {
    Comment.getAll(req.params.postId, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};
exports.findAllByUserId = (req, res) => {
    Comment.getAllByUserId(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};
exports.findAllToValidateByPostId = (req, res) => {
    Comment.getAllToValidateByPostId(req.params.postId, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};
// Retrieve all comments from the database.
exports.findAllToValidate = (req, res) => {
    Comment.getAllToValidate((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};
exports.findAllAdmin = (req, res) => {
    Comment.getAllAdmin((err, data) => {
        console.log(data);
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};
// Find a single comment with a commentId
exports.findOne = (req, res) => {
    Comment.findById(req.params.postId, req.params.commentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found comment with id ${req.params.commentId}.`
                });
            }
            if (err.kind === "post_not_found") {
                res.status(404).send({
                    message: `Not found comment with id ${req.params.commentId} and post_id ${req.params.postId}.`
                });
            }
        } else res.send(data);
    });
};
// Update a comment identified by the commentId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
    }
    if (req.body.comment_content.length > 3000) {
        return res.status(400).json({ error: "Le commentaire doit contenir 3000 caractères maximum" });
    }
    Comment.updateById(req.params.commentId, new Comment(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found comment with id ${req.params.commentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating comment with id " + req.params.commentId
                });
            }
        } else res.send(data);
    });
};
exports.validate = (req, res) => {
    Comment.validateById(req.params.commentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found comment with id ${req.params.commentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating comment with id " + req.params.commentId
                });
            }
        } else res.send(data);
    });
};
// Delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
    Comment.remove(req.params.postId, req.params.commentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found comment with id ${req.params.commentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete comment with id " + req.params.commentId
                });
            }
        } else res.send({ message: `le commentaire a été supprimé avec succès!` });
    });
};
// Delete all comments from the database.
exports.deleteAll = (req, res) => {
    Comment.removeAll(req.params.postId, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all comments."
            });
        else res.send({ message: `Tous les commentaires ont été supprimés avec succès!` });
    });
};

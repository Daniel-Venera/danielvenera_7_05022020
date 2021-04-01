const Post = require("../models/post.model.js");
// Create and Save a new post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
    }
    console.log(req);
    if (req.body.post_title.length > 150) {
        return res.status(400).json({ error: "Le titre doit contenir 150 caractères maximum" });
    }
    if (req.body.post_content.length > 6000) {
        return res.status(400).json({ error: "Le corps de l'article doit contenir 6000 caractères maximum" });
    }
    // Create a post
    const post = new Post({
        user_id: req.body.user_id,
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        post_file: req.body.post_file,
        post_state: req.body.post_state
    });
    // Save post in the database
    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Post."
            });
        else res.send(data);
    });
};
// Retrieve all posts from the database where post_state = 1.
exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving posts."
            });
        else res.send(data);
    });
};
// Retrieve all posts from the database where post_state = 0.
exports.findAllToValidate = (req, res) => {
    Post.getAllToValidate((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving posts."
            });
        else res.send(data);
    });
};
// Find a single post with a postId
exports.findOne = (req, res) => {
    Post.findById(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving post with id " + req.params.postId
                });
            }
        } else res.send(data);
    });
};
// Update a post identified by the postId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
    }
    if (req.body.post_title.length > 150) {
        return res.status(400).json({ error: "Le titre doit contenir 150 caractères maximum" });
    }
    if (req.body.post_content.length > 6000) {
        return res.status(400).json({ error: "Le corps de l'article doit contenir 6000 caractères maximum" });
    }
    Post.updateById(req.params.postId, new Post(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating post with id " + req.params.postId
                });
            }
        } else res.send(data);
    });
};
exports.validate = (req, res) => {
    Post.validateById(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    error: `Not found post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    error: "Error updating post with id " + req.params.postId
                });
            }
        } else res.send(data);
    });
};
// Delete a post with the specified postId in the request
exports.delete = (req, res) => {
    Post.remove(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete post with id " + req.params.postId
                });
            }
        } else res.send({ message: `L'article a été supprimé avec succès!` });
    });
};
// Delete all posts from the database.
exports.deleteAll = (req, res) => {
    Post.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all posts."
            });
        else res.send({ message: `Tous les articles ont été supprimés avec succès!` });
    });
};
//
exports.findOneById = (req, res) => {
    Post.findPostByUserId(req.params.userId, (err, data) => {
        if (err) {
            // if (err.kind === "not_found") {
            //     res.status(404).send({
            //         message: `Not found post with id ${req.params.postId}.`
            //     });
            // } else {
            //     res.status(500).send({
            //         message: "Error retrieving post with id " + req.params.postId
            //     });
            // }
        } else res.send(data);
    });
};

const Post = require("../models/post.model.js");
// Create and Save a new post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide!"
        });
    }
    // MULTER
    if (req.body.post_file) {
        console.log("oui");
        req.body.post_file = `${req.protocol}://${req.get("host")}/post_files/${req.body.post_file.post_filename}`;
    }
    // VERIFICATION INPUTS
    if (req.body.post_state && req.body.post_state !== 0) {
        return res.status(400).json({ error: "Une erreur est apparue" });
    }
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
        post_state: 0
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
// Retrieve all posts from the database.
exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
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

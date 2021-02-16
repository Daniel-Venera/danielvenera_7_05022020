const Post = require("../models/post.model.js");
// Create and Save a new post
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a post
  const post = new Post({
    idUser: req.body.idUser,
    title: req.body.title,
    content: req.body.content
  });
  // Save post in the database
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    else res.send(data);
  });
};
// Retrieve all posts from the database.
exports.findAll = (req, res) => {
  Post.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
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
      message: "Content can not be empty!"
    });
  }
  Post.updateById(
    req.params.postId,
    new Post(req.body),
    (err, data) => {
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
    }
  );
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
    } else res.send({ message: `post was deleted successfully!` });
  });
};
// Delete all posts from the database.
exports.deleteAll = (req, res) => {
  Post.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    else res.send({ message: `All posts were deleted successfully!` });
  });
};
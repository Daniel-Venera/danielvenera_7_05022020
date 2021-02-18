const Comment = require("../models/comment.model.js");
// Create and Save a new comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // MULTER
  if (req.body.file){
    req.body.file = `${req.protocol}://${req.get("host")}/files/${req.body.file.filename}`
  }
  // VERIFICATION INPUTS
  if (req.body.state && req.body.state !== 1){
    return res.status(400).json({error: 'Une erreur est apparue'})
  }
  // Create a comment
  const comment = new Comment({
    idUser: req.body.idUser,
    idPost: req.params.postId,
    content: req.body.content,
  });
  // Save comment in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment."
      });
    else res.send(data);
  });
};
// Retrieve all comments from the database.
exports.findAll = (req, res) => {
  Comment.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    else res.send(data);
  });
};
// Find a single comment with a commentId
exports.findOne = (req, res) => {
  Comment.findById(req.params.commentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found comment with id ${req.params.commentId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving comment with id " + req.params.commentId
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
      message: "Content can not be empty!"
    });
  }
  const dateUpdate = new Date();
  const state = 1;
  Comment.updateById(
    req.params.commentId,dateUpdate,state,
    new Comment(req.body),
    (err, data) => {
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
    }
  );
};
// Delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
  Comment.remove(req.params.commentId, (err, data) => {
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
    } else res.send({ message: `comment was deleted successfully!` });
  });
};
// Delete all comments from the database.
exports.deleteAll = (req, res) => {
  Comment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all comments."
      });
    else res.send({ message: `All comments were deleted successfully!` });
  });
};
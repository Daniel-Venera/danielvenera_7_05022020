const sql = require("./db.js");
// constructor
const Comment = function(comment) {
  this.idUser = comment.idUser;
  this.idPost = comment.idPost;
  this.content = comment.content;
};
Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};
Comment.findById = (commentId, result) => {
  sql.query(`SELECT * FROM comments WHERE id = ${commentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found comment: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found comment with the id
    result({ kind: "not_found" }, null);
  });
};
Comment.getAll = result => {
  sql.query("SELECT * FROM comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("comments: ", res);
    result(null, res);
  });
};
Comment.updateById = (id, dateUpdate, state, comment, result) => {
  sql.query(
    "UPDATE comments SET idUser = ?, idPost = ?, content = ?, dateUpdate = ?, state = ? WHERE id = ?",
    [comment.idUser, comment.idPost, comment.content, dateUpdate, state, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found comment with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated comment: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};
Comment.remove = (id, result) => {
  sql.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found comment with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted comment with id: ", id);
    result(null, res);
  });
};
Comment.removeAll = result => {
  sql.query("DELETE FROM comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} comments`);
    result(null, res);
  });
};
module.exports = Comment;
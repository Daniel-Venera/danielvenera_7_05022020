const sql = require("./db.js");
// constructor
const Post = function(post) {
  this.idUser = post.idUser;
  this.title = post.title;
  this.content = post.content;
  this.file = post.file;
};
Post.create = (newPost, result) => {
  // sql.query(`SELECT * FROM users WHERE id = ${newPost.idUser}`, (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }
  //   if (res.length) {
  //     console.log("found user: ", res[0]);
  //     result(null, res[0]);
  //     return;
  //   }
  //   // not found user with the id
  //   result({ kind: "not_found" }, null);
  // });
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};
Post.findById = (postId, result) => {
  sql.query(`SELECT * FROM posts WHERE id = ${postId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found post with the id
    result({ kind: "not_found" }, null);
  });
};
Post.getAll = result => {
  sql.query("SELECT * FROM posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("posts: ", res);
    result(null, res);
  });
};
Post.updateById = (id, dateUpdate, state, post, result) => {
  sql.query(
    "UPDATE posts SET idUser = ?, title = ?, content = ?, dateUpdate = ?, state = ? WHERE id = ?",
    [post.idUser, post.title, post.content, dateUpdate, state, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found post with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated post: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};
Post.remove = (id, result) => {
  sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found post with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted post with id: ", id);
    result(null, res);
  });
};
Post.removeAll = result => {
  sql.query("DELETE FROM posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} posts`);
    result(null, res);
  });
};
module.exports = Post;
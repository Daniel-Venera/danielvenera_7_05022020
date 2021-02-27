const sql = require("./db.js");
// constructor
const Post = function(post) {
    this.user_id = post.user_id;
    this.post_title = post.post_title;
    this.post_content = post.post_content;
    this.post_file = post.post_file;
};
var dateObj = new Date();
var month = (dateObj.getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }); //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var newdate = year + "-" + month + "-" + day;
Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created post: ", { post_id: res.insertId, ...newPost });
        result(null, { post_id: res.insertId, ...newPost });
    });
};
Post.findById = (postId, result) => {
    sql.query(`SELECT * FROM posts WHERE post_id = ${postId}`, (err, res) => {
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
    sql.query("SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id;", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("posts: ", res);
        result(null, res);
    });
};
Post.updateById = (id, post, result) => {
    sql.query(`UPDATE posts SET user_id = ${post.user_id}, post_title = '${post.post_title}', post_content = '${post.post_content}', post_date_update = '${newdate}', post_state = 0 WHERE post_id = ${id}`, (err, res) => {
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
        console.log("updated post: ", { post_id: id, ...post });
        result(null, { post_id: id, ...post });
    });
};
Post.remove = (id, result) => {
    sql.query("DELETE FROM posts WHERE post_id = ?", id, (err, res) => {
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

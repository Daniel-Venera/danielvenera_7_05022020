const sql = require("./db.js");
// constructor
const Post = function(post) {
    this.user_id = post.user_id;
    this.post_title = post.post_title;
    this.post_content = post.post_content;
    this.post_state = post.post_state;
    this.post_file = post.post_file;
    this.post_date_update = post.post_date_update;
};
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
    sql.query(`SELECT * FROM posts  INNER JOIN users ON posts.user_id = users.user_id  WHERE post_id = ${postId}`, (err, res) => {
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
    sql.query("SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id WHERE post_state = 1 ORDER BY post_date_creation DESC;", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("posts: ", res);
        result(null, res);
    });
};
Post.getAllToValidate = result => {
    sql.query("SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id WHERE post_state = 0 ORDER BY post_date_creation DESC;", (err, res) => {
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
    sql.query(`UPDATE posts SET  post_title = "${post.post_title}", post_content = "${post.post_content}", post_state = ${post.post_state}, post_date_update = "${post.post_date_update}" WHERE post_id = ${id}`, (err, res) => {
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
        sql.query(`SELECT * FROM comments WHERE post_id = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            } else {
                sql.query(`UPDATE comments SET comment_state = 3 WHERE post_id = ${id} AND comment_state = 1`, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    } else {
                        sql.query(`UPDATE likes SET like_state = 3 WHERE post_id = ${id} AND like_state = 1`, (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                                return;
                            }
                            console.log("updated post: ", { post_id: id, ...post });
                            result(null, { post_id: id, ...post });
                        });
                    }
                });
            }
        });
    });
};
Post.validateById = (id, result) => {
    sql.query(`UPDATE posts SET post_state = 1 WHERE post_id = ${id}`, (err, res) => {
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
        sql.query(`SELECT * FROM comments WHERE post_id = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            } else {
                sql.query(`UPDATE comments SET comment_state = 1 WHERE post_id = ${id} AND comment_state = 3`, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }
                    // console.log("updated post: ", { post_id: id, ...post });
                    // result(null, { post_id: id, ...post });
                });
            }
        });
        console.log("updated post: ", { post_id: id });
        result(null, { message: "Article validé !" });
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
Post.findPostByUserId = (userId, result) => {
    sql.query(`SELECT * FROM posts WHERE user_id = ${userId} AND post_state = 1`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found post: ", res);
            result(null, res);
            return;
        }
        // not found post with the id
        result({ kind: "not_found" }, null);
    });
};
module.exports = Post;

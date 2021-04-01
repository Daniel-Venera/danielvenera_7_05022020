const sql = require("./db.js");
// constructor
const Like = function(like) {
    this.user_id = like.user_id;
    this.post_id = like.post_id;
    this.like_state = like.like_state;
};
//Functions
Like.create = (newLike, result) => {
    sql.query(`SELECT * FROM users WHERE user_id = ${newLike.user_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            sql.query(`SELECT * FROM posts WHERE post_id = ${newLike.post_id}`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                if (res.length) {
                    sql.query(`SELECT * FROM likes WHERE post_id = ${newLike.post_id} AND user_id= ${newLike.user_id}`, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        if (res.length == 0) {
                            sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
                                if (err) {
                                    console.log("error: ", err);
                                    result(err, null);
                                    return;
                                }
                                console.log("created like: ", { like_id: res.insertId, ...newLike });
                                result(null, { like_id: res.insertId, ...newLike });
                                return;
                            });
                        } else {
                            result({ kind: "already_liked" }, null);
                            return;
                        }
                    });
                } else {
                    result({ kind: "post_not_found" }, null);
                    return;
                }
            });
        } else {
            result({ kind: "user_not_found" }, null);
            return;
        }
    });
};
Like.findById = (postId, likeId, result) => {
    sql.query(`SELECT * FROM likes WHERE like_id = ${likeId} `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            if (res[0].post_id != postId) {
                console.log("post not found");
                result({ kind: "post_not_found" }, null);
                return;
            } else {
                console.log("found like: ", res[0]);
                result(null, res[0]);
                return;
            }
        }
        // not found like with the id
        result({ kind: "not_found" }, null);
    });
};
Like.getAll = (postId, result) => {
    sql.query(`SELECT * FROM likes  INNER JOIN users ON likes.user_id = users.user_id   WHERE post_id=${postId}  ORDER BY like_date_creation DESC;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("likes: ", res);
        result(null, res);
    });
};
Like.getAllByUserId = (userId, result) => {
    sql.query(`SELECT * FROM likes WHERE user_id=${userId}  ORDER BY like_date_creation DESC;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("likes: ", res);
        result(null, res);
    });
};
Like.remove = (postId, id, result) => {
    sql.query(`DELETE FROM likes WHERE like_id = ${id} AND post_id = ${postId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found like with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted like with id: ", id);
        result(null, res);
    });
};
Like.removeOne = (postId, userId, result) => {
    sql.query(`DELETE FROM likes WHERE post_id = ${postId} AND user_id = ${userId}`, (err, res) => {
        console.log(postId);
        console.log(userId);
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found like with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted like");
        result(null, res);
    });
};
Like.getAllAdmin = result => {
    sql.query(`SELECT * FROM likes INNER JOIN users ON likes.user_id = users.user_id  ORDER BY like_date_creation DESC;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("likes: ", res);
        result(null, res);
    });
};
module.exports = Like;

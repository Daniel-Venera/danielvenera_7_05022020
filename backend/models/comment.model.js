const sql = require("./db.js");
// constructor
const Comment = function(comment) {
    this.user_id = comment.user_id;
    this.post_id = comment.post_id;
    this.comment_content = comment.comment_content;
    this.comment_state = comment.comment_state;
};
//Date
var dateObj = new Date();
var month = (dateObj.getUTCMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }); //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var newdate = year + "-" + month + "-" + day;
//Functions
Comment.create = (newComment, result) => {
    sql.query(`SELECT * FROM users WHERE user_id = ${newComment.user_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            sql.query(`SELECT * FROM posts WHERE post_id = ${newComment.post_id}`, (err, res) => {
                console.log(res);
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                if (res.length) {
                    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        console.log("created comment: ", { comment_id: res.insertId, ...newComment });
                        result(null, { comment_id: res.insertId, ...newComment });
                        return;
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
Comment.findById = (postId, commentId, result) => {
    sql.query(`SELECT * FROM comments WHERE comment_id = ${commentId} `, (err, res) => {
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
                console.log("found comment: ", res[0]);
                result(null, res[0]);
                return;
            }
        }
        // not found comment with the id
        result({ kind: "not_found" }, null);
    });
};
Comment.getAll = (postId, result) => {
    sql.query(`SELECT * FROM comments  INNER JOIN users ON comments.user_id = users.user_id   WHERE post_id=${postId} AND comment_state = 1 ORDER BY comment_date_creation DESC;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("comments: ", res);
        result(null, res);
    });
};
Comment.getAllByUserId = (userId, result) => {
    sql.query(`SELECT * FROM comments  WHERE user_id=${userId} AND comment_state = 1 ORDER BY comment_date_creation DESC;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("comments: ", res);
        result(null, res);
    });
};
Comment.getAllToValidateByPostId = (postId, result) => {
    sql.query(`SELECT * FROM comments  INNER JOIN users ON comments.user_id = users.user_id   WHERE post_id=${postId} ORDER BY comment_date_creation DESC;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("comments: ", res);
        result(null, res);
    });
};
Comment.getAllToValidate = result => {
    sql.query(`SELECT * FROM comments INNER JOIN users ON comments.user_id = users.user_id   WHERE comment_state = 0 ORDER BY comment_date_creation DESC;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("comments: ", res);
        result(null, res);
    });
};
Comment.updateById = (id, comment, result) => {
    sql.query(`UPDATE comments SET user_id = ${comment.user_id}, post_id = ${comment.post_id}, comment_content = '${comment.comment_content}', comment_date_update = '${newdate}', comment_state = ${comment.comment_state} WHERE comment_id = ${id}`, (err, res) => {
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
        console.log("updated comment: ", { comment_id: id, ...comment });
        result(null, { comment_id: id, ...comment });
    });
};
Comment.validateById = (id, result) => {
    sql.query(`UPDATE comments SET comment_state = 1 WHERE comment_id = ${id}`, (err, res) => {
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
        console.log("updated comment: ", { comment_id: id });
        result(null, { comment_id: id, message: "Commentaire Validé" });
    });
};
Comment.remove = (postId, id, result) => {
    sql.query(`DELETE FROM comments WHERE comment_id = ${id} AND post_id = ${postId}`, (err, res) => {
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
Comment.removeAll = (postId, result) => {
    sql.query(`DELETE FROM comments WHERE post_id = ${postId}`, (err, res) => {
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

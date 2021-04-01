const sql = require("./db.js");
// constructor
const User = function(user) {
    this.user_first_name = user.user_first_name;
    this.user_last_name = user.user_last_name;
    this.user_job = user.user_job;
    this.user_state = user.user_state;
    this.user_email = user.user_email;
    this.user_password = user.user_password;
};
User.create = (newUser, result) => {
    sql.query(`SELECT * FROM users WHERE user_email = '${newUser.user_email}'`, (err, res) => {
        if (err || res == false) {
            console.log("aucun user n'a cette adresse mail");
            sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created user: ", { user_id: res.insertId, ...newUser });
                result(null, { user_id: res.insertId, ...newUser });
            });
        } else {
            result(null, { message: "Un compte existe déjà avec cette adresse mail" });
        }
    });
};
User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE user_id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};
User.getAll = result => {
    sql.query("SELECT * FROM users WHERE user_state = 1 ORDER BY user_date_creation DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
User.getAllToValidate = result => {
    sql.query("SELECT * FROM users WHERE user_state = 0 ORDER BY user_date_creation DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
User.updateById = (id, user, result) => {
    sql.query("UPDATE users SET user_first_name = ?, user_last_name = ?, user_job = ?, user_email = ?, user_password = ?, user_state = ? WHERE user_id = ?", [user.user_first_name, user.user_last_name, user.user_job, user.user_email, user.user_password, user.user_state, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated user: ", { user_id: id, ...user });
        result(null, { user_id: id, ...user });
    });
};
User.validateById = (id, result) => {
    sql.query(`UPDATE users SET user_state = 1 WHERE user_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated user: ", { user_id: id });
        result(null, { message: "Utilisateur validé !" });
    });
};
User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE user_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with id: ", id);
        result(null, res);
    });
};
User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};
User.login = (user_email, result) => {
    sql.query(`SELECT * FROM users WHERE user_email = '${user_email}'  `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            if (res[0].user_state == 0) {
                result({ kind: "user_state_0" }, null);
                return;
            }
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};
module.exports = User;

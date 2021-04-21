fetch("http://localhost:3000/user/data", {
    method: "GET",
    headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
    }
})
    .then(res => res.json())
    .then(data => {
        if (data.authorizedData.userId !== 1) {
            location.href = "index.html";
        }
    })
    .catch(err => {
        location.href = "login.html";
    });
// To Validate
const usersToValidate = [];
const postsToValidate = [];
const commentsToValidate = [];
const userToValidatepostUrlApi = "http://localhost:3000/users/validation";
const postToValidatepostUrlApi = "http://localhost:3000/posts/validation";
const commentToValidatepostUrlApi = "http://localhost:3000/posts/comments/validation";
function callApi(url) {
    return fetch(url, { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } })
        .then(function(response) {
            return response.json();
        })
        .catch(err => console.error(err));
}
function pushData(data, typeOfData) {
    if (typeOfData == "postsToValidate") {
        data.forEach(e => {
            e.post_date_creation = new Date(e.post_date_creation);
            e.post_date_creation = e.post_date_creation.toLocaleDateString("fr-FR") + " à " + e.post_date_creation.getHours() + ":" + (e.post_date_creation.getMinutes() < 10 ? "0" : "") + e.post_date_creation.getMinutes();
            if (e.post_date_update) {
                e.post_date_update = new Date(e.post_date_update);
                e.post_date_update = (e.post_date_update.getDate() < 10 ? "0" : "") + e.post_date_update.getDate() + "/" + (e.post_date_update.getMonth() < 10 ? "0" : "") + (e.post_date_update.getMonth() + 1) + "/" + e.post_date_update.getFullYear() + " à " + (e.post_date_update.getHours() < 8 ? "0" : "") + (e.post_date_update.getHours() + 2) + ":" + (e.post_date_update.getMinutes() < 10 ? "0" : "") + e.post_date_update.getMinutes();
            }
            postsToValidate.push(e);
        });
    } else if (typeOfData == "usersToValidate") {
        data.forEach(e => {
            e.user_date_creation = new Date(e.user_date_creation);
            e.user_date_creation = e.user_date_creation.toLocaleDateString("fr-FR") + " à " + e.user_date_creation.getHours() + ":" + (e.user_date_creation.getMinutes() < 10 ? "0" : "") + e.user_date_creation.getMinutes();
            if (e.user_date_update) {
                e.user_date_update = new Date(e.user_date_update);
                e.user_date_update = (e.user_date_update.getDate() < 10 ? "0" : "") + e.user_date_update.getDate() + "/" + (e.user_date_update.getMonth() < 10 ? "0" : "") + (e.user_date_update.getMonth() + 1) + "/" + e.user_date_update.getFullYear() + " à " + (e.user_date_update.getHours() < 8 ? "0" : "") + (e.user_date_update.getHours() + 2) + ":" + (e.user_date_update.getMinutes() < 10 ? "0" : "") + e.user_date_update.getMinutes();
            }
            usersToValidate.push(e);
        });
    } else if (typeOfData == "commentsToValidate") {
        data.forEach(e => {
            e.comment_date_creation = new Date(e.comment_date_creation);
            e.comment_date_creation = e.comment_date_creation.toLocaleDateString("fr-FR") + " à " + e.comment_date_creation.getHours() + ":" + (e.comment_date_creation.getMinutes() < 10 ? "0" : "") + e.comment_date_creation.getMinutes();
            commentsToValidate.push(e);
        });
    } else if (typeOfData == "users") {
        data.forEach(e => {
            e.user_date_creation = new Date(e.user_date_creation);
            e.user_date_creation = e.user_date_creation.toLocaleDateString("fr-FR") + " à " + e.user_date_creation.getHours() + ":" + (e.user_date_creation.getMinutes() < 10 ? "0" : "") + e.user_date_creation.getMinutes();
            if (e.user_date_update) {
                e.user_date_update = new Date(e.user_date_update);
                e.user_date_update = (e.user_date_update.getDate() < 10 ? "0" : "") + e.user_date_update.getDate() + "/" + (e.user_date_update.getMonth() < 10 ? "0" : "") + (e.user_date_update.getMonth() + 1) + "/" + e.user_date_update.getFullYear() + " à " + (e.user_date_update.getHours() < 8 ? "0" : "") + (e.user_date_update.getHours() + 2) + ":" + (e.user_date_update.getMinutes() < 10 ? "0" : "") + e.user_date_update.getMinutes();
            }
            users.push(e);
        });
    } else if (typeOfData == "comments") {
        data.forEach(e => {
            e.comment_date_creation = new Date(e.comment_date_creation);
            e.comment_date_creation = e.comment_date_creation.toLocaleDateString("fr-FR") + " à " + e.comment_date_creation.getHours() + ":" + (e.comment_date_creation.getMinutes() < 10 ? "0" : "") + e.comment_date_creation.getMinutes();
            comments.push(e);
        });
    } else if (typeOfData == "likes") {
        data.forEach(e => {
            e.like_date_creation = new Date(e.like_date_creation);
            e.like_date_creation = e.like_date_creation.toLocaleDateString("fr-FR") + " à " + e.like_date_creation.getHours() + ":" + (e.like_date_creation.getMinutes() < 10 ? "0" : "") + e.like_date_creation.getMinutes();
            likes.push(e);
        });
    }
}
callApi(postToValidatepostUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data, "postsToValidate");
    }
});
callApi(userToValidatepostUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data, "usersToValidate");
    }
});
callApi(commentToValidatepostUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data, "commentsToValidate");
    }
});
// State 1
const posts = [];
const users = [];
const comments = [];
const likes = [];
const postUrlApi = "http://localhost:3000/posts";
const userUrlApi = "http://localhost:3000/users";
const commentUrlApi = "http://localhost:3000/posts/comments/admin";
const likeUrlApi = "http://localhost:3000/posts/likes/admin";
function postsPush(data) {
    data.forEach(e => {
        e.post_date_creation = new Date(e.post_date_creation);
        e.post_date_creation = e.post_date_creation.toLocaleDateString("fr-FR") + " à " + e.post_date_creation.getHours() + ":" + (e.post_date_creation.getMinutes() < 10 ? "0" : "") + e.post_date_creation.getMinutes();
        if (e.post_date_update) {
            e.post_date_update = new Date(e.post_date_update);
            e.post_date_update = (e.post_date_update.getDate() < 10 ? "0" : "") + e.post_date_update.getDate() + "/" + (e.post_date_update.getMonth() < 10 ? "0" : "") + (e.post_date_update.getMonth() + 1) + "/" + e.post_date_update.getFullYear() + " à " + (e.post_date_update.getHours() < 8 ? "0" : "") + (e.post_date_update.getHours() + 2) + ":" + (e.post_date_update.getMinutes() < 10 ? "0" : "") + e.post_date_update.getMinutes();
        }
        posts.push(e);
    });
}
callApi(postUrlApi).then(function(data) {
    if (data.length > 0) {
        postsPush(data);
    } else {
        postMessage = "Il n'y a pas d'articles pour le moment";
    }
});
callApi(userUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data, "users");
    }
});
callApi(commentUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data, "comments");
    }
});
callApi(likeUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data, "likes");
    }
});
// Vue
app = new Vue({
    el: "#root",
    data: {
        postsToValidate: postsToValidate,
        usersToValidate: usersToValidate,
        commentsToValidate: commentsToValidate,
        posts: posts,
        users: users,
        comments: comments,
        likes: likes,
        section: "validation",
        toValidate: "usersToValidate"
    },
    methods: {
        showValidation(e) {
            this.toValidate = e;
        },
        filter(e) {
            this.section = e;
        }
    }
});

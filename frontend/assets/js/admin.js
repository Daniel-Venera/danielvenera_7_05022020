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
        console.log(err);
    });
// To Validate
const usersToValidate = [];
const postsToValidate = [];
const commentsToValidate = [];
const userToValidatepostUrlApi = "http://localhost:3000/users/validation";
const postToValidatepostUrlApi = "http://localhost:3000/posts/validation";
const commentToValidatepostUrlApi = "http://localhost:3000/posts/comments/validation";
function callApi(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .catch(err => console.error(err));
}
function pushData(data, typeOfData) {
    if (typeOfData == "postsToValidate") {
        data.forEach(e => {
            postsToValidate.push(e);
        });
    } else if (typeOfData == "usersToValidate") {
        data.forEach(e => {
            usersToValidate.push(e);
        });
    } else if (typeOfData == "commentsToValidate") {
        data.forEach(e => {
            commentsToValidate.push(e);
        });
    } else if (typeOfData == "users") {
        data.forEach(e => {
            users.push(e);
        });
    } else if (typeOfData == "comments") {
        data.forEach(e => {
            comments.push(e);
        });
    } else if (typeOfData == "likes") {
        data.forEach(e => {
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
        let commentLength = 0;
        callApi(postUrlApi + "/" + e.post_id + "/comments").then(function(commentsData) {
            Array.from(commentsData).forEach(function(j) {
                if (j.comment_state == 1) {
                    commentLength++;
                }
            });
            e.comment_length = commentLength;
            let likeLength = 0;
            callApi(postUrlApi + "/" + e.post_id + "/likes").then(function(likesData) {
                Array.from(likesData).forEach(function(j) {
                    likeLength++;
                });
                e.like_length = likeLength;
                posts.push(e);
            });
        });
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
    console.log(data);
    if (data.length > 0) {
        console.log("oui");
        pushData(data, "users");
    }
});
callApi(commentUrlApi).then(function(data) {
    console.log(data);
    if (data.length > 0) {
        pushData(data, "comments");
    }
});
callApi(likeUrlApi).then(function(data) {
    console.log(data);
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

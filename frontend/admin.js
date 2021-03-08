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
        console.log(err);
    });
const users = [];
const posts = [];
const comments = [];
const userUrlApi = "http://localhost:3000/users";
const postUrlApi = "http://localhost:3000/posts";
function callApi(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .catch(err => console.error(err));
}
function pushData(data) {
    data.forEach(e => {
        if (e.post_id) {
            callApi(postUrlApi + "/" + e.post_id + "/comments").then(function(dataComment) {
                if (dataComment.length > 0) {
                    pushDataComment(dataComment);
                }
            });
        }
        if (e.post_state == 0) {
            posts.push(e);
        }
        if (e.user_state == 0) {
            users.push(e);
        }
    });
    if (posts.length == 0) {
        document.body.querySelector("#postsToValidate").textContent = "Il n'y a pas d'articles à valider pour le moment";
    }
    // if (users.length == 0) {
    //     document.body.querySelector("#usersToValidate").textContent = "Il n'y a pas d'utilisateurs à valider pour le moment";
    // }
}
function pushDataComment(dataComment) {
    dataComment.forEach(e => {
        if (e.comment_state == 0) {
            comments.push(e);
        }
    });
    if (comments.length == 0) {
        document.body.querySelector("#commentsToValidate").textContent = "Il n'y a pas de commentaires à valider pour le moment";
    }
}
callApi(postUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data);
    }
});
callApi(userUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data);
    }
});
var postVue = new Vue({
    el: "#postsToValidate",
    data: {
        posts: posts
    }
});
var userVue = new Vue({
    el: "#usersToValidate",
    data: {
        validateUsers: users
    }
});
var commentVue = new Vue({
    el: "#commentsToValidate",
    data: {
        comments: comments
    }
});

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
const users = [];
const posts = [];
const comments = [];
const userUrlApi = "http://localhost:3000/users/validation";
const postUrlApi = "http://localhost:3000/posts/validation";
const commentUrlApi = "http://localhost:3000/posts/comments/validation";
function callApi(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .catch(err => console.error(err));
}
function pushData(data, typeOfData) {
    if (typeOfData == "posts") {
        data.forEach(e => {
            posts.push(e);
        });
    } else if (typeOfData == "users") {
        data.forEach(e => {
            users.push(e);
        });
    } else {
        data.forEach(e => {
            comments.push(e);
        });
    }
}
callApi(postUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data, "posts");
    }
});
callApi(userUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data, "users");
    }
});
callApi(commentUrlApi).then(function(data) {
    if (data.length > 0) {
        pushData(data);
    }
});
app = new Vue({
    el: "#root",
    data: {
        posts: posts,
        users: users,
        comments: comments
    }
});

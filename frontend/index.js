fetch("http://localhost:3000/user/data", {
    method: "GET",
    headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
    }
})
    .then(res => res.json())
    .then(data => {
        console.log(data.authorizedData.userId);
    })
    .catch(err => {
        location.href = "login.html";
        console.log(err);
    });
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const message = document.querySelector("#generalMessage");
if (urlParams.get("post_created")) {
    if (urlParams.get("post_created") == "admin") {
        message.textContent = "Poste soumis !";
    } else {
        message.textContent = "Merci ! Un administrateur validera votre article dans les prochains jours";
    }
}
const posts = [];
const urlApi = "http://localhost:3000/posts";
function callApi(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .catch(err => console.error(err));
}
function postsPush(data) {
    data.forEach(e => {
        if (e.post_state == 1) {
            let commentLength = 0;
            callApi(urlApi + "/" + e.post_id + "/comments").then(function(commentsData) {
                Array.from(commentsData).forEach(function(j) {
                    if (j.comment_state == 1) {
                        commentLength = commentLength + 1;
                    }
                });
                e.comment_length = commentLength;
                posts.push(e);
            });
        }
    });
}
callApi(urlApi).then(function(data) {
    if (data.length > 0) {
        postsPush(data);
    } else {
        // postsDisplay.message = "Il n'y a pas d'articles pour le moment";
        document.body.querySelector("#posts").textContent = "Il n'y a pas d'articles pour le moment";
    }
});
var postsDisplay = new Vue({
    el: "#posts",
    data: {
        todos: posts
    }
});
document.querySelector("#state").textContent = "UserID ACTUEL = " + sessionStorage.getItem("userId");

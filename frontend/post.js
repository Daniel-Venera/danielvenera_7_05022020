const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");
const postUrlApi = "http://localhost:3000/posts/" + postId;
function postGetApi(url) {
    return fetch(url)
        .then(function(response) {
            if (response.status == 404) {
                location.href = "index.html";
            }
            return response.json();
        })
        .catch(err => console.error(err));
}
function showPost(postData) {
    if (postData.post_state == 0 && sessionStorage.getItem("userId") == 1) {
        document.querySelector("#postValidation").style.display = "block";
        document.querySelector("#postValidation").addEventListener("click", function() {
            let UpdateInfos = { user_id: postData.user_id, post_title: postData.post_title, post_content: postData.post_content, post_state: 1 };
            const options = {
                method: "put",
                body: JSON.stringify(UpdateInfos),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            postApiUpdate(postUrlApi, options);
        });
    }
    var postVue = new Vue({
        el: "#post",
        data: {
            post: postData
        }
    });
    var postVueTitle = new Vue({
        el: "#postTitle",
        data: {
            postTitle: postData.post_title
        }
    });
}
postGetApi(postUrlApi).then(function(postData) {
    showPost(postData);
});
//Commenter
const commentUrlApi = "http://localhost:3000/posts/" + postId + "/comments";
function commentApiPost(url, options) {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            document.querySelector("#commentForm").style.display = "none";
            document.querySelector("#commentMessage").textContent = "Merci ! Un administrateut validera votre commentaire dans les prochains jours";
        })
        .catch(err => console.error(err));
}
document.querySelector("#commentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var commentContent = document.querySelector("#commentContent").value;
    var userId = sessionStorage.getItem("userId");
    let createCommentInfos = { comment_content: commentContent, user_id: userId };
    const options = {
        method: "post",
        body: JSON.stringify(createCommentInfos),
        headers: {
            "Content-Type": "application/json"
        }
    };
    commentApiPost(commentUrlApi, options);
});
//Voir commentaires
const comments = [];
function commentGetApi(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .catch(err => console.error(err));
}
function commentsPush(data) {
    data.forEach(e => {
        if (e.comment_state > 0) {
            comments.push(e);
        }
        if (sessionStorage.getItem("userId") == 1 && e.comment_state == 0) {
            comments.push(e);
        }
    });
}
commentGetApi(commentUrlApi).then(function(data) {
    if (data.length > 0) {
        commentsPush(data);
    } else {
        document.body.querySelector("#comments").innerHTML = "<span>Il n'y a pas de commentaires pour le moment</span>";
    }
});
var commentsVue = new Vue({
    el: "#comments",
    data: {
        comments: comments
    },
    methods: {
        validate: function(comment) {
            const UpdateInfos = { user_id: comment.user_id, post_id: comment.post_id, comment_content: comment.comment_content, comment_state: 1 };
            const options = {
                method: "put",
                body: JSON.stringify(UpdateInfos),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            commentApiUpdate(commentUrlApi + "/" + comment.comment_id, options);
        }
    }
});
document.querySelector("#postValidation").addEventListener("click", function() {});
//Valider post
function postApiUpdate(url, options) {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            document.querySelector("#postValidation").style.display = "none";
            document.querySelector("#postMessage").textContent = "Merci ! L'article a bien été validé";
        })
        .catch(err => console.error(err));
}
// Valider Commentaire
function commentApiUpdate(url, options) {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            document.querySelector("#commentMessage").textContent = "Merci ! Le commentaire a bien été validé";
        })
        .catch(err => console.error(err));
}

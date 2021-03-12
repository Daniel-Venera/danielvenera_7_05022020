const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let message = "";
let postMessage = "";
if (urlParams.get("post_created")) {
    if (urlParams.get("post_created") == "admin") {
        message = "Poste soumis !";
    } else {
        message = "Merci ! Un administrateur validera votre article dans les prochains jours";
    }
}
if (urlParams.get("deleted_user")) {
    message = "Utilisateur bien supprimé";
}
if (urlParams.get("updated_post")) {
    message = "Merci pour vos modifications, votre article sera validé par un administrateur";
}
if (urlParams.get("deleted_post")) {
    message = "L'article a bien été supprimé";
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
    });
}
callApi(urlApi).then(function(data) {
    if (data.length > 0) {
        postsPush(data);
    } else {
        postMessage = "Il n'y a pas d'articles pour le moment";
    }
});
app = new Vue({
    el: "#root",
    data: {
        todos: posts,
        message: message,
        postMessage: postMessage,
        state: "UserID ACTUEL = " + sessionStorage.getItem("userId")
    }
});

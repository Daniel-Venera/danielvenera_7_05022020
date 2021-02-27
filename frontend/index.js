if (!sessionStorage.getItem("token")) {
    location.href = "login.html";
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
        posts.push(e);
    });
}
callApi(urlApi).then(function(data) {
    if (data.length > 0) {
        postsPush(data);
    } else {
        document.body.querySelector("#home").textContent = "Il n'y a pas d'articles pour le moment";
        console.log("Il n'y a pas d'articles pour le moment");
    }
});
var home = new Vue({
    el: "#home",
    data: {
        todos: posts
    }
});

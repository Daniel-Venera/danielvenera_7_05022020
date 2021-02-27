const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");
const urlApi = "http://localhost:3000/posts/" + postId;
function callApi(url) {
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
callApi(urlApi).then(function(postData) {
    showPost(postData);
});

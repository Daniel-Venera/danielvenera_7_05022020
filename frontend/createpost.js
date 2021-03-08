const urlApi = "http://localhost:3000/posts";
function callApiPost(url, options) {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            if (response.post_state == 1) {
                location.href = "index.html?post_created=admin";
            } else {
                location.href = "index.html?post_created=user";
            }
        })
        .catch(err => console.error(err));
}
document.querySelector("#createPostForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var post_title = document.querySelector("#postTitle").value;
    var post_content = document.querySelector("#postContent").value;
    var user_id = sessionStorage.getItem("userId");
    var post_state = sessionStorage.getItem("userId") == 1 ? "1" : "0";
    let createPostInfos = { user_id, post_title, post_content, post_state };
    console.log(createPostInfos);
    const options = {
        method: "post",
        body: JSON.stringify(createPostInfos),
        headers: {
            "Content-Type": "application/json"
        }
    };
    callApiPost(urlApi, options);
});

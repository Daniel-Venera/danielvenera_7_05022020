const urlApi = "http://localhost:3000/posts";
function callApiPost(url, options) {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            document.querySelector("#createPostMessage").textContent = "Merci ! Un administrateut valider votre article dans les prochains jours";
        })
        .catch(err => console.error(err));
}
document.querySelector("#createPostForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var post_title = document.querySelector("#postTitle").value;
    var post_content = document.querySelector("#postContent").value;
    var user_id = sessionStorage.getItem("userId");
    let createPostInfos = { user_id, post_title, post_content };
    const options = {
        method: "post",
        body: JSON.stringify(createPostInfos),
        headers: {
            "Content-Type": "application/json"
        }
    };
    callApiPost(urlApi, options);
});

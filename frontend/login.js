const urlApi = "http://localhost:3000/login";
function callApiPost(url, options) {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            if (response.error) {
                document.querySelector("#loginMessage").innerHTML = response.error;
            } else {
                sessionStorage.setItem("token", response.token);
                sessionStorage.setItem("userId", response.userId);
                window.location.replace("./index.html");
            }
        })
        .catch(err => console.error(err));
}
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    var user_email = document.querySelector("#userEmail").value;
    var user_password = document.querySelector("#userPassword").value;
    let loginInfos = { user_email, user_password };
    const options = {
        method: "post",
        body: JSON.stringify(loginInfos),
        headers: {
            "Content-Type": "application/json"
        }
    };
    callApiPost(urlApi, options);
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get("id");
const urlApi = "http://localhost:3000/users/" + userId;
function callApi(url) {
    return fetch(url)
        .then(function(response) {
            // if (response.status == 404) {
            //     location.href = "index.html";
            // }
            return response.json();
        })
        .catch(err => console.error(err));
}
function showuser(userData) {
    if (userData.user_state == 0 && sessionStorage.getItem("userId") != 1) {
        location.href = "index.html";
    } else if (userData.user_state == 0) {
        document.querySelector("#userValidate").style.display = "block";
        document.querySelector("#userForm").style.display = "block";
        document.querySelector("#user").style.display = "none";
        document.querySelector("#userFirstName").value = userData.user_first_name;
        document.querySelector("#userLastName").value = userData.user_last_name;
        document.querySelector("#userJob").value = userData.user_job;
        document.querySelector("#userEmail").value = userData.user_email;
        document.querySelector("#userValidate").addEventListener("click", function() {
            document.querySelector("#userValidate").style.display = "none";
            var user_first_name = document.querySelector("#userFirstName").value;
            var user_last_name = document.querySelector("#userLastName").value;
            var user_job = document.querySelector("#userJob").value;
            var user_email = document.querySelector("#userEmail").value;
            var user_password = document.querySelector("#userPassword").value;
            var user_state = 1;
            let UpdateInfos = { user_first_name, user_last_name, user_job, user_state, user_email, user_password };
            const options = {
                method: "put",
                body: JSON.stringify(UpdateInfos),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            userApiUpdate(urlApi, options);
        });
    }
    var userVue = new Vue({
        el: "#user",
        data: {
            user: userData
        }
    });
    var userVueTitle = new Vue({
        el: "#userTitle",
        data: {
            userTitle: userData.user_first_name + " " + userData.user_last_name
        }
    });
    if (sessionStorage.getItem("userId") == userId) {
        document.querySelector("#userForm").style.display = "block";
        document.querySelector("#user").style.display = "none";
        document.querySelector("#userFirstName").value = userData.user_first_name;
        document.querySelector("#userLastName").value = userData.user_last_name;
        document.querySelector("#userJob").value = userData.user_job;
        document.querySelector("#userEmail").value = userData.user_email;
    }
    if (sessionStorage.getItem("userId") == userId || sessionStorage.getItem("userId") == "1") {
        document.querySelector("#userDelete").style.display = "block";
        document.querySelector("#userDelete").addEventListener("click", function() {
            const deleteOptions = {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            userApiDelete(urlApi, deleteOptions);
        });
    }
}
callApi(urlApi).then(function(userData) {
    showuser(userData);
});
//update
function userApiUpdate(url, options) {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            document.querySelector("#userMessage").textContent = "Merci ! Les informations ont bien été mises à jour";
        })
        .catch(err => console.error(err));
}
document.querySelector("#userForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var user_first_name = document.querySelector("#userFirstName").value;
    var user_last_name = document.querySelector("#userLastName").value;
    var user_job = document.querySelector("#userJob").value;
    var user_email = document.querySelector("#userEmail").value;
    var user_password = document.querySelector("#userPassword").value;
    var user_state = sessionStorage.getItem("userId") == 25 ? "2" : "1";
    let UpdateInfos = { user_first_name, user_last_name, user_job, user_state, user_email, user_password };
    const options = {
        method: "put",
        body: JSON.stringify(UpdateInfos),
        headers: {
            "Content-Type": "application/json"
        }
    };
    userApiUpdate(urlApi, options);
});
//delete
function userApiDelete(url, options) {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            sessionStorage.clear();
            document.querySelector("#userMessage").textContent = "Le compte a bien été supprimé";
        })
        .catch(err => console.error(err));
}
// Retrieve posts
const postsUrlApi = "http://localhost:3000/posts/user/" + userId;
let userPosts = [];
callApi(postsUrlApi).then(function(data) {
    console.log(data);
    data.forEach(e => {
        userPosts.push(e);
    });
    if (userPosts.length == 0) {
        document.querySelector("#postsMessage").textContent = `Cet utilisateur n'a pas écrit d'article pour le moment`;
    }
});
var postsVue = new Vue({
    el: "#posts",
    data: {
        posts: userPosts
    }
});

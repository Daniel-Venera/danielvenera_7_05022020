const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get("id");
if (isNaN(userId)) {
    location.href = "index.html";
}
//Api Url
let userDataUrl = "http://localhost:3000/user/data";
const urlApi = "http://localhost:3000/users/" + userId;
const validateUrlApi = "http://localhost:3000/users/" + userId + "/validation";
const postsUrlApi = "http://localhost:3000/posts/user/" + userId;
const commentsUrlApi = "http://localhost:3000/users/" + userId + "/comments";
// Options
let optionsUserData = { method: "GET", headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } };
// Api Calls
function callApiUserId(url, options) {
    return fetch(url, options)
        .then(res => res.json())
        .catch(err => {
            location.href = "login.html";
            console.log(err);
        });
}
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
let userPosts = [];
let userComments = [];
callApiUserId(userDataUrl, optionsUserData).then(function(data) {
    let currentUserId = data.authorizedData.userId;
    callApi(urlApi).then(function(userData) {
        showuser(userData, currentUserId);
    });
});
let isCurrentUser = false;
let isUserValidate = true;
function showuser(userData, currentUserId) {
    console.log(userData);
    if (userData.user_state == 0 && currentUserId != 1) {
        location.href = "index.html";
    } else if (currentUserId == 1 && userData.user_state == 0) {
        isUserValidate = false;
    }
    if (userData.user_id == currentUserId) {
        isCurrentUser = true;
    }
    callApi(postsUrlApi).then(function(data) {
        data.forEach(e => {
            userPosts.push(e);
        });
    });
    callApi(commentsUrlApi).then(function(data) {
        console.log(data);
        data.forEach(e => {
            userComments.push(e);
        });
    });
    title = new Vue({
        el: "#title",
        data: {
            title: userData.user_first_name + " " + userData.user_last_name
        }
    });
    app = new Vue({
        el: "#root",
        data: {
            currentUserId: currentUserId,
            isCurrentUser: isCurrentUser,
            isUserValidate: isUserValidate,
            firstName: userData.user_first_name,
            lastName: userData.user_last_name,
            job: userData.user_job,
            email: userData.user_email,
            userPosts: userPosts,
            userComments: userComments,
            password: "",
            updateMessage: "",
            userState: userData.user_state,
            updateInfos: {},
            options: {}
        },
        methods: {
            update() {
                this.updateInfos = { user_first_name: this.firstName, user_last_name: this.lastName, user_job: this.job, user_email: this.email, user_password: this.password, user_state: this.userState };
                this.options = { method: "put", body: JSON.stringify(this.updateInfos), headers: { "Content-Type": "application/json" } };
                var self = this;
                fetch(urlApi, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        self.updateMessage = response.error ? response.error : "Merci ! Vos données ont été mises à jour";
                    })
                    .catch(err => console.error(err));
            },
            validateUser() {
                var self = this;
                this.options = { method: "put", headers: { "Content-Type": "application/json" } };
                fetch(validateUrlApi, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        self.updateMessage = response.error ? response.error : response.message;
                        self.isUserValidate = true;
                    })
                    .catch(err => console.error(err));
            },
            deleteUser() {
                if (confirm("Êtes-vous sûr ?")) {
                    this.options = {
                        method: "delete",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };
                    var self = this;
                    fetch(urlApi, this.options)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(response) {
                            console.log(response);
                            if (self.isCurrentUser) {
                                sessionStorage.clear();
                                location.href = "login.html";
                            } else {
                                location.href = "index.html?deleted_user=true";
                            }
                        })
                        .catch(err => console.error(err));
                }
            }
        }
    });
}

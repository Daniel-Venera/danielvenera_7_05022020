const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");
if (isNaN(postId)) {
    location.href = "index.html";
}
//url
const postUrlApi = "http://localhost:3000/posts/" + postId;
const userDataUrl = "http://localhost:3000/user/data";
const validateUrlApi = "http://localhost:3000/posts/" + postId + "/validation";
const commentUrlApi = "http://localhost:3000/posts/" + postId + "/comments";
const likeUrlApi = "http://localhost:3000/posts/" + postId + "/likes";
const commentUrlApiValidation = "http://localhost:3000/posts/" + postId + "/comments/validation";
// options
let optionsUserData = { method: "GET", headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } };
// apiCall
function callApiUserId(url, options) {
    return fetch(url, options)
        .then(res => res.json())
        .catch(err => {
            location.href = "login.html";
        });
}
function postGetApi(url, options) {
    return fetch(url, options)
        .then(function(response) {
            if (response.status == 404) {
                location.href = "index.html";
            }
            return response.json();
        })
        .catch(err => console.error(err));
}
function getApi(url) {
    return fetch(url, { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } })
        .then(function(response) {
            return response.json();
        })
        .catch(err => console.error(err));
}
// show Post
let isPostValidate = true;
let isAuthor = false;
let comments = [];
let likes = [];
let hasLiked = [];
function showPost(postData, currentUserId) {
    postData.post_date_creation = new Date(postData.post_date_creation);
    postData.post_date_creation = (postData.post_date_creation.getDate() < 10 ? "0" : "") + postData.post_date_creation.getDate() + "/" + (postData.post_date_creation.getMonth() < 10 ? "0" : "") + (postData.post_date_creation.getMonth() + 1) + "/" + postData.post_date_creation.getFullYear() + " à " + (postData.post_date_creation.getHours() < 10 ? "0" : "") + postData.post_date_creation.getHours() + ":" + (postData.post_date_creation.getMinutes() < 10 ? "0" : "") + postData.post_date_creation.getMinutes();
    if (postData.post_date_update) {
        postData.post_date_update = new Date(postData.post_date_update);
        postData.post_date_update = (postData.post_date_update.getDate() < 10 ? "0" : "") + postData.post_date_update.getDate() + "/" + (postData.post_date_update.getMonth() < 10 ? "0" : "") + (postData.post_date_update.getMonth() + 1) + "/" + postData.post_date_update.getFullYear() + " à " + (postData.post_date_update.getHours() < 8 ? "0" : "") + (postData.post_date_update.getHours() + 2) + ":" + (postData.post_date_update.getMinutes() < 10 ? "0" : "") + postData.post_date_update.getMinutes();
    }
    getApi(likeUrlApi).then(function(likeData) {
        if (likeData.length > 0) {
            likeData.forEach(e => {
                likes.push(e);
                if (e.user_id == currentUserId) {
                    hasLiked.push("test");
                }
            });
        }
    });
    if (postData.post_state == 0 && currentUserId !== 1) {
        location.href = "index.html";
    }
    if (postData.post_state == 0 && currentUserId == 1) {
        isPostValidate = false;
    }
    if (postData.user_id == currentUserId) {
        isAuthor = true;
    }
    if (currentUserId == 1) {
        getApi(commentUrlApiValidation).then(function(data) {
            if (data.length > 0) {
                data.forEach(e => {
                    e.comment_date_creation = new Date(e.comment_date_creation);
                    e.comment_date_creation = (e.comment_date_creation.getDate() < 10 ? "0" : "") + e.comment_date_creation.getDate() + "/" + (e.comment_date_creation.getMonth() < 10 ? "0" : "") + (e.comment_date_creation.getMonth() + 1) + "/" + e.comment_date_creation.getFullYear() + " à " + (e.comment_date_creation.getHours() < 10 ? "0" : "") + e.comment_date_creation.getHours() + ":" + (e.comment_date_creation.getMinutes() < 10 ? "0" : "") + e.comment_date_creation.getMinutes();
                    if (e.comment_date_update) {
                        e.comment_date_update = new Date(e.comment_date_update);
                        e.comment_date_update = (e.comment_date_update.getDate() < 10 ? "0" : "") + e.comment_date_update.getDate() + "/" + (e.comment_date_update.getMonth() < 10 ? "0" : "") + (e.comment_date_update.getMonth() + 1) + "/" + e.comment_date_update.getFullYear() + " à " + (e.comment_date_update.getHours() < 8 ? "0" : "") + (e.comment_date_update.getHours() + 2) + ":" + (e.comment_date_update.getMinutes() < 10 ? "0" : "") + e.comment_date_update.getMinutes();
                    }
                    comments.push(e);
                });
            }
        });
    } else {
        getApi(commentUrlApi).then(function(data) {
            if (data.length > 0) {
                data.forEach(e => {
                    e.comment_date_creation = new Date(e.comment_date_creation);
                    e.comment_date_creation = (e.comment_date_creation.getDate() < 10 ? "0" : "") + e.comment_date_creation.getDate() + "/" + (e.comment_date_creation.getMonth() < 10 ? "0" : "") + (e.comment_date_creation.getMonth() + 1) + "/" + e.comment_date_creation.getFullYear() + " à " + (e.comment_date_creation.getHours() < 10 ? "0" : "") + e.comment_date_creation.getHours() + ":" + (e.comment_date_creation.getMinutes() < 10 ? "0" : "") + e.comment_date_creation.getMinutes();
                    if (e.comment_date_update) {
                        e.comment_date_update = new Date(e.comment_date_update);
                        e.comment_date_update = (e.comment_date_update.getDate() < 10 ? "0" : "") + e.comment_date_update.getDate() + "/" + (e.comment_date_update.getMonth() < 10 ? "0" : "") + (e.comment_date_update.getMonth() + 1) + "/" + e.comment_date_update.getFullYear() + " à " + (e.comment_date_update.getHours() < 8 ? "0" : "") + (e.comment_date_update.getHours() + 2) + ":" + (e.comment_date_update.getMinutes() < 10 ? "0" : "") + e.comment_date_update.getMinutes();
                    }
                    comments.push(e);
                });
            }
        });
    }
    title = new Vue({
        el: "#title",
        data: {
            title: postData.post_title
        }
    });
    app = new Vue({
        el: "#root",
        data: {
            post: postData,
            currentUserId: currentUserId,
            isAuthor: isAuthor,
            isPostValidate: isPostValidate,
            options: {},
            updateMessage: "",
            commentMessage: "",
            updateCommentMessage: "",
            updatedComment: "",
            comments: comments,
            comment: "",
            infos: {},
            commentState: currentUserId == 1 ? "1" : "0",
            commentUrlValidationUpdate: "",
            likes: likes,
            updateArticleState: false,
            hasLiked: hasLiked
        },
        methods: {
            validatePost() {
                var self = this;
                this.options = { method: "put", headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } };
                fetch(validateUrlApi, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        self.updateMessage = response.error ? response.error : response.message;
                        self.isPostValidate = true;
                    })
                    .catch(err => console.error(err));
            },
            updatePost() {
                var self = this;
                var date = new Date();
                var date = date
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");
                this.infos = {
                    user_id: this.post.user_id,
                    post_title: this.post.post_title,
                    post_content: this.post.post_content,
                    post_state: this.currentUserId == 1 ? 1 : 0,
                    post_date_update: date
                };
                this.options = { method: "put", body: JSON.stringify(this.infos), headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } };
                fetch(postUrlApi, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        if (response.error) {
                            self.updateMessage = response.error;
                        } else if (self.currentUserId == 1) {
                            self.updateMessage = "Votre article a bien été modifié";
                        } else {
                            location.href = "index.html?updated_post=true";
                        }
                    })
                    .catch(err => console.error(err));
            },
            deletePost() {
                if (confirm("Êtes-vous sûr ?")) {
                    this.options = {
                        method: "delete",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + sessionStorage.getItem("token")
                        }
                    };
                    var self = this;
                    fetch(postUrlApi, this.options)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(response) {
                            location.href = "index.html?deleted_post=true";
                        })
                        .catch(err => console.error(err));
                }
            },
            commentPost() {
                var self = this;
                this.infos = { comment_content: this.comment, user_id: this.currentUserId, comment_state: this.commentState };
                this.options = { method: "post", body: JSON.stringify(this.infos), headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } };
                fetch(commentUrlApi, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        if (response.comment_state == 1) {
                            self.commentMessage = "Commentaire soumis !";
                        } else {
                            self.commentMessage = "Votre commentaire sera validé par un administrateur";
                        }
                    })
                    .catch(err => console.error(err));
            },
            validateComment(comment) {
                var self = this;
                this.commentUrlValidationUpdate = "http://localhost:3000/posts/" + postId + "/comments/" + comment.comment_id + "/validation";
                this.options = { method: "put", headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } };
                fetch(this.commentUrlValidationUpdate, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        self.commentMessage = response.error ? response.error : response.message;
                        comment.comment_state = 1;
                    })
                    .catch(err => console.error(err));
            },
            updateComment(comment) {
                var self = this;
                var date = new Date();
                var date = date
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");
                this.infos = { user_id: comment.user_id, post_id: postId, comment_content: comment.comment_content, comment_state: this.currentUserId == 1 ? 1 : 0, comment_date_update: date };
                this.options = { method: "put", body: JSON.stringify(this.infos), headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } };
                fetch(commentUrlApi + "/" + comment.comment_id, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        self.updatedComment = comment;
                        if (response.error) {
                            self.updateCommentMessage = response.error;
                        } else if (self.currentUserId == 1) {
                            self.updateCommentMessage = "Votre commentaire a bien été modifié";
                        } else {
                            self.commentMessage = "Merci, un admin validera votre commentaire";
                            self.comments.splice(self.comments.indexOf(comment), 1);
                        }
                    })
                    .catch(err => console.error(err));
            },
            deleteComment(comment) {
                if (confirm("Êtes-vous sûr ?")) {
                    this.options = {
                        method: "delete",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + sessionStorage.getItem("token")
                        }
                    };
                    var self = this;
                    fetch(commentUrlApi + "/" + comment.comment_id, this.options)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(response) {
                            if (response.error) {
                                self.updateMessage = response.error;
                            } else {
                                self.updateMessage = "Le commentaire a bien été supprimé";
                                self.comments.splice(self.comments.indexOf(comment), 1);
                            }
                        })
                        .catch(err => console.error(err));
                }
            },
            likePost() {
                var self = this;
                this.infos = { user_id: currentUserId, post_id: postId, like_state: 1 };
                this.options = { method: "post", body: JSON.stringify(this.infos), headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") } };
                fetch(likeUrlApi, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        self.likes.push(response);
                        self.hasLiked.push("test");
                    })
                    .catch(err => console.error(err));
            },
            likeDelete() {
                this.options = {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                    }
                };
                var self = this;
                fetch("http://localhost:3000/posts/" + this.post.post_id + "/likes/user/" + this.currentUserId, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        self.hasLiked.pop();
                        self.likes.length--;
                    })
                    .catch(err => console.error(err));
            },
            updateState() {
                this.updateArticleState = true;
            },
            normalState() {
                this.updateArticleState = false;
            }
        }
    });
}
callApiUserId(userDataUrl, optionsUserData).then(function(data) {
    let currentUserId = data.authorizedData.userId;
    postGetApi(postUrlApi, { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } }).then(function(postData) {
        showPost(postData, currentUserId);
    });
});

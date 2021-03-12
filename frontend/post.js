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
const commentUrlApiValidation = "http://localhost:3000/posts/" + postId + "/comments/validation";
// options
let optionsUserData = { method: "GET", headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } };
// apiCall
function callApiUserId(url, options) {
    return fetch(url, options)
        .then(res => res.json())
        .catch(err => {
            location.href = "login.html";
            console.log(err);
        });
}
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
function commentGetApi(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .catch(err => console.error(err));
}
// show Post
let isPostValidate = true;
let isAuthor = false;
let comments = [];
function showPost(postData, currentUserId) {
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
        commentGetApi(commentUrlApiValidation).then(function(data) {
            if (data.length > 0) {
                data.forEach(e => {
                    comments.push(e);
                });
            }
        });
    } else {
        commentGetApi(commentUrlApi).then(function(data) {
            if (data.length > 0) {
                data.forEach(e => {
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
            postInfos: {},
            options: {},
            updateMessage: "",
            comments: comments,
            comment: "",
            commentInfos: {},
            commentState: currentUserId == 1 ? "1" : "0",
            commentUrlValidationUpdate: ""
        },
        methods: {
            validatePost() {
                var self = this;
                this.options = { method: "put", headers: { "Content-Type": "application/json" } };
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
                console.log(this.currentUserId);
                this.postInfos = { user_id: this.post.user_id, post_title: this.post.post_title, post_content: this.post.post_content, post_state: this.currentUserId == 1 ? 1 : 0 };
                console.log(this.postInfos);
                this.options = { method: "put", body: JSON.stringify(this.postInfos), headers: { "Content-Type": "application/json" } };
                fetch(postUrlApi, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        console.log(response);
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
                            "Content-Type": "application/json"
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
                console.log(this.commentState);
                var self = this;
                this.commentInfos = { comment_content: this.comment, user_id: this.currentUserId, comment_state: this.commentState };
                this.options = { method: "post", body: JSON.stringify(this.commentInfos), headers: { "Content-Type": "application/json" } };
                fetch(commentUrlApi, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        if (response.comment_state == 1) {
                            self.updateMessage = "Commentaire soumis !";
                        } else {
                            self.updateMessage = "Votre commentaire sera validé par un administrateur";
                        }
                    })
                    .catch(err => console.error(err));
            },
            validateComment(comment) {
                var self = this;
                this.commentUrlValidationUpdate = "http://localhost:3000/posts/" + postId + "/comments/" + comment.comment_id + "/validation";
                this.options = { method: "put", headers: { "Content-Type": "application/json" } };
                fetch(this.commentUrlValidationUpdate, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        self.updateMessage = response.error ? response.error : response.message;
                        comment.comment_state = 1;
                    })
                    .catch(err => console.error(err));
            },
            updateComment(comment) {
                var self = this;
                this.commentInfos = { user_id: comment.user_id, post_id: postId, comment_content: comment.comment_content, comment_state: this.currentUserId == 1 ? 1 : 0 };
                this.options = { method: "put", body: JSON.stringify(this.commentInfos), headers: { "Content-Type": "application/json" } };
                fetch(commentUrlApi + "/" + comment.comment_id, this.options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(response) {
                        console.log(response);
                        if (response.error) {
                            self.updateMessage = response.error;
                        } else if (self.currentUserId == 1) {
                            self.updateMessage = "Votre commentaire a bien été modifié";
                        } else {
                            self.updateMessage = "Merci, un admin validera votre commentaire";
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
                            "Content-Type": "application/json"
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
            }
        }
    });
}
callApiUserId(userDataUrl, optionsUserData).then(function(data) {
    let currentUserId = data.authorizedData.userId;
    postGetApi(postUrlApi).then(function(postData) {
        showPost(postData, currentUserId);
    });
});

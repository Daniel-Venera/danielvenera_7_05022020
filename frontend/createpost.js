app = new Vue({
    el: "#root",
    data: {
        post_title: "",
        post_content: "",
        post_file: "",
        user_id: sessionStorage.getItem("userId"),
        post_state: sessionStorage.getItem("userId") == 1 ? "1" : "0",
        createPostInfos: {},
        options: {},
        urlApi: "http://localhost:3000/posts"
    },
    methods: {
        createPost: function() {
            this.createPostInfos = { post_title: this.post_title, post_content: this.post_content, user_id: this.user_id, post_state: this.post_state, post_file: this.post_file.value };
            this.options = {
                method: "post",
                body: JSON.stringify(this.createPostInfos),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            fetch(this.urlApi, this.options)
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
    }
});

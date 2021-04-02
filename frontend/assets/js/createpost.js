var app = new Vue({
    el: "#root",
    data: {
        post_title: "",
        post_content: "",
        file: "",
        user_id: sessionStorage.getItem("userId"),
        post_state: sessionStorage.getItem("userId") == 1 ? "1" : "0",
        createPostInfos: {},
        options: {},
        urlApi: "http://localhost:3000/posts",
        date: "",
        fileName: ""
    },
    methods: {
        onSelect: function() {
            const file = this.$refs.file.files[0];
            if (file.type == "image/png") {
                var type = "png";
            } else {
                var type = "jpg";
            }
            this.date = Date.now();
            console.log(file);
            this.file = file;
            // this.file.name = this.file.name.split(" ").join("_") + this.date;
            console.log(this.file);
            const formData = new FormData();
            formData.append("file", this.file);
            console.log(formData.get("file"));
            console.log(formData);
        },
        async onSubmit() {
            console.log(this.file);
            var self = this;
            if (this.file) {
                const formData = new FormData();
                formData.append("file", this.file);
                try {
                    await axios.post("http://localhost:3000/upload", formData).then(function(response) {
                        self.fileName = response;
                    });
                } catch (err) {
                    console.log(err);
                }
                if (this.file.type == "image/png") {
                    var type = "png";
                } else {
                    var type = "jpg";
                }
                this.file = "http://localhost:3000/uploads/" + this.fileName;
            }
            this.createPostInfos = { post_title: this.post_title, post_content: this.post_content, user_id: this.user_id, post_state: this.post_state, post_file: this.file };
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
                    // if (response.post_state == 1) {
                    //     location.href = "index.html?post_created=admin";
                    // } else {
                    //     location.href = "index.html?post_created=user";
                    // }
                })
                .catch(err => console.error(err));
        }
    }
});

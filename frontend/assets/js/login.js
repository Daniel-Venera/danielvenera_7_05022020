app = new Vue({
    el: "#root",
    data: {
        email: "",
        password: "",
        loginMessage: "",
        loginInfos: {},
        options: {},
        urlApi: "http://localhost:3000/login",
        error: false
    },
    methods: {
        login: function() {
            var self = this;
            this.loginInfos = { user_email: this.email, user_password: this.password };
            this.options = {
                method: "post",
                body: JSON.stringify(this.loginInfos),
                headers: { "Content-Type": "application/json" }
            };
            fetch(this.urlApi, this.options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    if (response.error) {
                        self.loginMessage = response.error;
                        self.error = true;
                    } else {
                        sessionStorage.setItem("token", response.token);
                        sessionStorage.setItem("userId", response.userId);
                        window.location.replace("./index.html");
                    }
                })
                .catch(err => console.error(err));
        }
    }
});

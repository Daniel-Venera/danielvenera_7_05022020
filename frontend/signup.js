app = new Vue({
    el: "#root",
    data: {
        firstName: "",
        lastName: "",
        job: "",
        email: "",
        password: "",
        signUpMessage: "",
        signUpInfos: {},
        urlApi: "http://localhost:3000/users",
        options: {}
    },
    methods: {
        signUp: function() {
            var self = this;
            this.signUpInfos = { user_first_name: this.firstName, user_last_name: this.lastName, user_job: this.job, user_state: 0, user_email: this.email, user_password: this.password };
            this.options = {
                method: "post",
                body: JSON.stringify(this.signUpInfos),
                headers: { "Content-Type": "application/json" }
            };
            fetch(this.urlApi, this.options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    console.log(response);
                    self.signUpMessage = response.error ? response.error : "Merci ! Un administrateur validera votre inscription dans les prochains jours";
                })
                .catch(err => console.error(err));
        }
    }
});

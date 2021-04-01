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
        options: {},
        signedUp: false
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
                    self.signUpMessage = response.message ? response.message : "Merci ! Un administrateur validera votre inscription dans les prochains jours";
                    self.signedUp = response.message ? false : true;
                })
                .catch(err => console.error(err));
        }
    }
});

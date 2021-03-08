var userVue = new Vue({
    el: "#userId",
    data: {
        userId: sessionStorage.getItem("userId")
    }
});
var userVue = new Vue({
    el: "#admin",
    data: {
        admin: sessionStorage.getItem("userId") == "1"
    }
});

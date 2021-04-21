var userVue = new Vue({
    el: "#header",
    data: {
        userId: sessionStorage.getItem("userId"),
        admin: sessionStorage.getItem("userId") == "1"
    },
    methods: {
        logOut() {
            sessionStorage.clear();
            location.href = "login.html";
        }
    }
});
window.onscroll = function() {
    myFunction();
};
var navbar = document.getElementById("header");
var sticky = navbar.offsetTop;
function myFunction() {
    if (window.pageYOffset >= sticky) {
        document.body.classList.add("content");
        navbar.classList.add("sticky");
    } else {
        document.body.classList.remove("content");
        navbar.classList.remove("sticky");
    }
}

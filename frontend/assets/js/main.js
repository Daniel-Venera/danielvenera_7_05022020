// fetch("http://localhost:3000/user/data", {
//     method: "GET",
//     headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token")
//     }
// })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         location.href = "login.html";
//         console.log(err);
//     });
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

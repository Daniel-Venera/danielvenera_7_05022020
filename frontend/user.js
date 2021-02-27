const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get("id");
const urlApi = "http://localhost:3000/users/" + userId;
function callApi(url) {
    return fetch(url)
        .then(function(response) {
            if (response.status == 404) {
                location.href = "index.html";
            }
            return response.json();
        })
        .catch(err => console.error(err));
}
function showuser(userData) {
    var userVue = new Vue({
        el: "#user",
        data: {
            user: userData
        }
    });
    var userVueTitle = new Vue({
        el: "#userTitle",
        data: {
            userTitle: userData.user_first_name + " " + userData.user_last_name
        }
    });
}
callApi(urlApi).then(function(userData) {
    showuser(userData);
});

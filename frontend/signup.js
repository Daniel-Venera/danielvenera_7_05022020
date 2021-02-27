const urlApi = "http://localhost:3000/users";
function callApiPost(url, options) {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            if (response.message) {
                document.querySelector("#signUpMessage").textContent = response.message;
            } else {
                document.querySelector("#signUpForm").style.display = "none";
                document.querySelector("#signUpMessage").textContent = "Merci ! Un administrateur validera votre inscription dans les prochains jours";
            }
        })
        .catch(err => console.error(err));
}
document.querySelector("#signUpForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var user_first_name = document.querySelector("#userFirstName").value;
    var user_last_name = document.querySelector("#userLastName").value;
    var user_job = document.querySelector("#userJob").value;
    var user_email = document.querySelector("#userEmail").value;
    var user_password = document.querySelector("#userPassword").value;
    let SignUpInfos = { user_first_name, user_last_name, user_job, user_email, user_password };
    const options = {
        method: "post",
        body: JSON.stringify(SignUpInfos),
        headers: {
            "Content-Type": "application/json"
        }
    };
    callApiPost(urlApi, options);
});

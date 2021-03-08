document.querySelector("#logOut").addEventListener("click", function() {
    sessionStorage.clear();
    location.href = "login.html";
});

function login() {

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email] && users[email].password === password) {

        localStorage.setItem("loggedInUser", JSON.stringify(users[email]));
        localStorage.setItem("loggedIn", JSON.stringify(true));

        window.location.href = "user.html";

    } else {

        alert("Email or password is wrong");

    }

}

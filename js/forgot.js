function resetPassword() {

    let username =
        document.getElementById("username").value;

    let newPassword =
        document.getElementById("newPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {

        alert("Passwords do not match");
        return;
    }

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let found = false;

    for (let i = 0; i < users.length; i++) {

        if (users[i].username === username) {
            users[i].password = newPassword;
             found = true;
            break;
        }
    }

    if (found) {

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );
        alert("Password Updated Successfully");
        window.location.href = "login.html";

    } else {
        alert("Username not found");
    }
}
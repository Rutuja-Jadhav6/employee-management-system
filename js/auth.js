function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("loggedInUser")
    );
}

function logout() {

    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

function checkAdmin() {

    let user = getCurrentUser();
    if (!user || user.role !== "admin") {
        window.location.href = "login.html";
    }

    return user;
}

function checkEmployee() {
    let user = getCurrentUser();
    if (!user || user.role !== "employee") {
        window.location.href = "login.html";
    }

    return user;
}
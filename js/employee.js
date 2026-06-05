let loggedInUser = checkEmployee();

document.getElementById("welcome").innerHTML =
    "Welcome, " + loggedInUser.username;

let employees =
    JSON.parse(localStorage.getItem("employees")) || [];

let arr = employees.filter(emp =>
    emp.EmpId === loggedInUser.empId
);
let table = document.querySelector("table");

display();

function display() {

    let str =
        "<tr><th>ID</th><th>Name</th><th>Phone</th><th>Department</th><th>Joining-Date</th></tr>";

    for (let i = 0; i < arr.length; i++) {

        str +=
            "<tr>" +
            "<td>" + arr[i].EmpId + "</td>" +
            "<td>" + arr[i].EmpName + "</td>" +
            "<td>" + arr[i].EmpPhone + "</td>" +
            "<td>" + arr[i].EmpDept + "</td>" +
            "<td>" + arr[i].EmpDate + "</td>" +
            "</tr>";
    }

    table.innerHTML = str;
}
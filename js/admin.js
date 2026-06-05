let loggedInUser = checkAdmin();

document.getElementById("welcome").innerHTML =
    "Welcome, " + loggedInUser.username;

let arr =
    JSON.parse(localStorage.getItem("employees")) || [];

let txtId = document.getElementById("txtId");
let txtName = document.getElementById("txtName");
let txtPhone = document.getElementById("txtPhone");
let txtDept = document.getElementById("txtDept");
let txtDate = document.getElementById("txtDate");

let table = document.querySelector("table");

let selectedIndex = -1;

display();

function funAdd() {

    let strId = txtId.value.trim();
    let strName = txtName.value.trim();
    let strPhone = txtPhone.value.trim();
    let strDept = txtDept.value;
    var today = new Date();
    var month = today.getMonth() + 1;
    var strDate = today.getDate() + "/" + month + "/" + today.getFullYear();

    if (
        strId === "" ||
        strName === "" ||
        strPhone === "" ||
        strDept === "" ||
        strDate === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    if (!strId.startsWith("EMP")) {
        strId = "EMP" + strId;
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].EmpId === strId) {
            alert("Employee ID already exists");
            return;
        }
    }

    let pattern = /^[1-9][0-9]{9}$/;

    if (!pattern.test(strPhone)) {
        alert("Invalid Phone Number");
        return;
    }

    let obj = {
        EmpId: strId,
        EmpName: strName,
        EmpPhone: strPhone,
        EmpDept: strDept,
        EmpDate: strDate,
    };

    arr.push(obj);

    localStorage.setItem(
        "employees",
        JSON.stringify(arr)
    );

    display();

    clearFields();
}

function display() {
    let str =
        "<tr><th>ID</th><th>Name</th><th>Phone</th><th>Department</th><th>Joining-Date</th><th>Update</th><th>Delete</th></tr>";

    for (let i = 0; i < arr.length; i++) {
        str +=
            "<tr>" +

            "<td>" + arr[i].EmpId + "</td>" +

            "<td>" + arr[i].EmpName + "</td>" +

            "<td>" + arr[i].EmpPhone + "</td>" +

            "<td>" + arr[i].EmpDept + "</td>" +

            "<td>" + arr[i].EmpDate + "</td>" +

            "<td><button class='update-btn' onclick='fillForm(" + i + ")'>Update</button></td>" +

            "<td><button class='delete-btn' onclick='funDelete(" + i + ")'>Delete</button></td>" +

            "</tr>";
    }

    table.innerHTML = str;


}

function fillForm(index) {
    selectedIndex = index;

    txtId.value = arr[index].EmpId;
    txtName.value = arr[index].EmpName;
    txtPhone.value = arr[index].EmpPhone;
    txtDept.value = arr[index].EmpDept;
    txtDate.value = arr[index].EmpDate;
}

function funUpdate() {
    if (selectedIndex === -1) {
        alert("Select employee first");
        return;
    }

    arr[selectedIndex].EmpName = txtName.value.trim();
    arr[selectedIndex].EmpPhone = txtPhone.value.trim();
    arr[selectedIndex].EmpDept = txtDept.value;
    // arr[selectedIndex].EmpDate = txtDate.value;

    localStorage.setItem(
        "employees",
        JSON.stringify(arr)
    );

    alert("Employee Updated");

    display();

    clearFields();


}

function funDelete(index) {
    let check = confirm("Delete Employee?");

    if (check) {

        arr.splice(index, 1);
        localStorage.setItem(
            "employees",
            JSON.stringify(arr)
        );

        display();
    }

}

function searchEmployee() {
    let value =
        document.getElementById("searchBox")
            .value
            .toLowerCase();

    let str =
        "<tr><th>ID</th><th>Name</th><th>Phone</th><th>Department</th><th>Date</th><th>Update</th><th>Delete</th></tr>";

    for (let i = 0; i < arr.length; i++) {

        let empId =
            arr[i].EmpId.toLowerCase();

        let empName =
            arr[i].EmpName.toLowerCase();

        if (
            empId.includes(value) ||
            empName.includes(value)
        ) {

            str +=
                "<tr>" +

                "<td>" + arr[i].EmpId + "</td>" +

                "<td>" + arr[i].EmpName + "</td>" +

                "<td>" + arr[i].EmpPhone + "</td>" +

                "<td>" + arr[i].EmpDept + "</td>" +

                "<td>" + arr[i].EmpDate + "</td>" +

                "<td><button class='update-btn' onclick='fillForm(" + i + ")'>Update</button></td>" +

                "<td><button class='delete-btn' onclick='funDelete(" + i + ")'>Delete</button></td>" +

                "</tr>";
        }
    }

    table.innerHTML = str;
}

function clearFields() {
    txtId.value = "";
    txtName.value = "";
    txtPhone.value = "";
    txtDept.value = "";
    txtDate.value = "";

    selectedIndex = -1;
}

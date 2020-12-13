let selectElement = (s) => document.querySelector(s);
let links = document.querySelectorAll(".nav-link");

selectElement(".menu-icon").addEventListener("click", () => {
    selectElement(".nav-list").classList.toggle("active");
    selectElement(".menu-icon").classList.toggle("switch");
});

links.forEach(link => {
    link.addEventListener("click", () => {
        selectElement(".nav-list").classList.toggle("active");
        selectElement(".menu-icon").classList.toggle("switch");
    });
});


// Starts the program logic when the button is clicked.
function runClick() {
    var httpRequest;
    document.getElementById("show-info").onclick = 
    sendRequest("myClasses.json");

// Checks validity of request and its status and sends it.
function sendRequest(url) {
    httpRequest = new XMLHttpRequest();
    // Check if instance was created.
    if (!httpRequest) {
        console.log("Failed to create an XMLHttp instance.");
        return false;
    }

    // Call the arrow function when the state of the request changes.
    httpRequest.onreadystatechange = showContents;

    // Make the request as GET and to the json file. 
    httpRequest.open("GET", url);
    // Send the request.
    httpRequest.send();
}
    
    function showContents() {
        // Check if request is ready.
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            // Check server response code. 200 means a successful call.
            if (httpRequest.status === 200) {
                displayTable();
            }
            else {
                console.log("Request status was not 200.");
            }
        } 
    };

// This function populates the table and injects it into the HTML.
function displayTable() {
    // Parse the JSON file.
    let myArray = JSON.parse(httpRequest.responseText).my_classes;

    // Refer to the table tag.
    let table = document.getElementById("class-table");
    // Create the table elements for the header of the table.
    let tr = document.createElement("tr");
    let thCourse = document.createElement("th");
    let thGrade = document.createElement("th");
    let thSemester = document.createElement("th");
    let thYear = document.createElement("th");

    // Insert the four titles into the heading.
    thCourse.innerHTML = "Course";
    thGrade.innerHTML = "Grade";
    thSemester.innerHTML = "Semester";
    thYear.innerHTML = "Year";

    // Append the created data into the HTML tags we created.
    table.appendChild(tr);
    tr.appendChild(thCourse);
    tr.appendChild(thGrade);
    tr.appendChild(thSemester);
    tr.appendChild(thYear);
    
    // For loop to create HTML tags and populate them row by row.
    for (var i = 0; i < myArray.length; i++) {
        // Create a new row element and four data elements.
        let tr = document.createElement("tr");
        let tdCourse = document.createElement("td");
        let tdGrade = document.createElement("td");
        let tdSemester = document.createElement("td");
        let tdYear = document.createElement("td");
        // Populate them with data from the parsed JSON file.
        tdCourse.innerHTML = myArray[i].class.title;
        tdGrade.innerHTML = myArray[i].class.grade;
        tdSemester.innerHTML = myArray[i].class.semester;
        tdYear.innerHTML = myArray[i].class.year;
        // Insert the data into our table tag.
        table.appendChild(tr);
        tr.appendChild(tdCourse);
        tr.appendChild(tdGrade);
        tr.appendChild(tdSemester);
        tr.appendChild(tdYear);
    }
    // Add the data we just populated into the HTML document.
    document.getElementById("class-table").innerHTML = table.innerHTML;
}
}

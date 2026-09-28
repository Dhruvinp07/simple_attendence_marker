// Initialize state from local storage or create an empty array
let students = JSON.parse(localStorage.getItem('attendanceData')) || [];

// Function to save data to local storage
function saveData() {
    localStorage.setItem('attendanceData', JSON.stringify(students));
}

// Function to render the list of students
function renderList() {
    const listBody = document.getElementById('studentList');
    listBody.innerHTML = '';

    let presentCount = 0;
    let absentCount = 0;

    students.forEach((student, index) => {
        const tr = document.createElement('tr');
        
        // Count attendance
        if (student.status === 'Present') presentCount++;
        if (student.status === 'Absent') absentCount++;

        tr.innerHTML = `
            <td>${student.name}</td>
            <td class="${student.status === 'Present' ? 'text-success' : (student.status === 'Absent' ? 'text-danger' : '')}">
                ${student.status}
            </td>
            <td>
                <button class="btn-present" onclick="markAttendance(${index}, 'Present')">Present</button>
                <button class="btn-absent" onclick="markAttendance(${index}, 'Absent')">Absent</button>
            </td>
        `;
        listBody.appendChild(tr);
    });

    // Update Summary
    document.getElementById('totalCount').innerText = students.length;
    document.getElementById('presentCount').innerText = presentCount;
    document.getElementById('absentCount').innerText = absentCount;
}

// Function to add a new student
function addStudent() {
    const nameInput = document.getElementById('studentName');
    const name = nameInput.value.trim();

    if (name !== "") {
        students.push({
            name: name,
            status: 'Pending'
        });
        nameInput.value = ''; // Clear input field
        saveData();
        renderList();
    } else {
        alert("Please enter a valid name.");
    }
}

// Function to mark attendance
function markAttendance(index, status) {
    students[index].status = status;
    saveData();
    renderList();
}

// Function to clear all data
function clearData() {
    if(confirm("Are you sure you want to clear all attendance data?")) {
        students = [];
        saveData();
        renderList();
    }
}

// Initial render when the page loads
renderList();

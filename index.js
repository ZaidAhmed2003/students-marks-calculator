// Assignment 1

// Task Grade Calculator

// If the average score is greater than or equal to 90, the grade is A;
// If the average score is between 80 and 89, the grade is B;
// If the average score is between 70 and 79, the grade is C;
// If the average score is between 60 and 69, the grade is D;
// If the average score is less than 60, the grade is F;

const gradeTable = document.getElementById("gradetable");
const nameInput = document.getElementById("name");
let studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];

function addStudent() {
  const name = nameInput.value.trim();
  if (name !== "") {
    const exams = [];
    for (let i = 0; i < 3; i++) {
      exams.push(getRandomScore());
    }
    studentsData.push({ name, exams, average: 0, grade: "" });
    calculateAverage(studentsData.length - 1);
    renderTable();
    nameInput.value = "";
    saveToLocalStorage();
  } else {
    alert("Enter Student Name");
  }
}

nameInput.addEventListener("input", () => {
  if (nameInput.value.length > 12) {
    nameInput.value = nameInput.value.substring(0, 12);
  }
});

function getRandomScore() {
  return Math.floor(Math.random() * 75) + 25;
}

function updateExamScore(studentIndex, examIndex, score) {
  studentsData[studentIndex].exams[examIndex] = score;
  calculateAverage(studentIndex);
  saveToLocalStorage();
}

function calculateAverage(studentIndex) {
  const student = studentsData[studentIndex];
  const sum = student.exams.reduce((acc, score) => acc + parseFloat(score), 0);
  const average = sum / student.exams.length || 0;
  student.average = average.toFixed(0);
  student.grade = calculateGrade(average);
  renderTable();
}

function calculateGrade(averageScore) {
  let grade;

  if (averageScore >= 90) grade = "A1+";
  else if (averageScore >= 80) grade = "A1";
  else if (averageScore >= 70) grade = "A";
  else if (averageScore >= 60) grade = "B";
  else if (averageScore >= 50) grade = "C";
  else if (averageScore >= 40) grade = "D";
  else grade = "F";

  return grade;
}

function renderTable() {
  gradeTable.innerHTML = `
    <tr>
      <th>S.No</th>
      <th>Student Name</th>
      <th>Exam 1</th>
      <th>Exam 2</th>
      <th>Exam 3</th>
      <th>Average</th>
      <th>Grade</th>
      <th></th>
    </tr>
    ${studentsData
      .map(
        (student, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td><input type="number" value="${
          student.exams[0]
        }" onchange="updateExamScore(${index}, 0, this.value)"></td>
        <td><input type="number" value="${
          student.exams[1]
        }" onchange="updateExamScore(${index}, 1, this.value)"></td>
        <td><input type="number" value="${
          student.exams[2]
        }" onchange="updateExamScore(${index}, 2, this.value)"></td>
        <td>${student.average || ""}</td>
        <td>${student.grade || ""}</td>
        <td class="closebtn" onclick="deleteStudent(${index})">&#x2715;</td>
      </tr>
    `
      )
      .join("")}
  `;
}

function deleteStudent(studentIndex) {
  studentsData.splice(studentIndex, 1);
  renderTable();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("studentsData", JSON.stringify(studentsData));
}
renderTable();

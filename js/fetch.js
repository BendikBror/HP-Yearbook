const API = "https://hp-api.onrender.com/api/characters";

const houseImages = document
  .getElementById("house-images")
  .getElementsByTagName("img");
const studentList = document.getElementById("student-list");
const allStudents = [];
const btn_randomStudent = document.getElementById("btnRandomStudent");
const form = document.getElementById("newStudent");
const result = document.getElementById("result");
const studentCard = document.getElementById("studentCard");

fetch(API)
  .then((res) => {
    // gjør om responsen til JSON data
    return res.json();
  })
  .then((data) => {
    data.forEach((student) => {
      allStudents.push(student);
    });
    //viser alle elever når siden loades inn
    displayStudents(data);

    // filtrerer eleven etter hus når du bytter hus
    for (let i = 0; i < houseImages.length; i++) {
      const img = houseImages[i];
      img.addEventListener("click", () => {
        const selectedHouse = img.dataset.house;
        const filteredData = selectedHouse
          ? data.filter((student) => student.house === selectedHouse)
          : data;
        displayStudents(filteredData);
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const house = document.getElementById("house").value;
  const yearOfBirth = document.getElementById("yearOfBirth").value;
  const newStudent ={name: name, house: house, yearOfBirth: yearOfBirth};
  allStudents.unshift(newStudent);
  displayStudents(allStudents);
})
 

function displayStudents(students) {
  studentList.innerHTML = "";
  students.forEach((student) => {
    const isAlive = student.alive;
    let age = "unknown";
    if ( student.yearOfBirth != "" && isAlive){
      age = 2023 - parseInt(student.yearOfBirth);
    }
    else if(!isAlive){
      age = `<span style=color:red>Deceased</span>`;
    }
    studentList.innerHTML += `
                <tr>
                    <td><img class="portrait-img" src="${student.image}" alt="${
      student.name
    }"></td>
                    <td>${student.name}</td>
                    <td>${student.house}</td>
                    <td>${age}</td>
                </tr>    
                `;
  });
}




btn_randomStudent.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * allStudents.length);
  const randomStudent = allStudents[randomIndex];
  studentCard.innerHTML = `
  <img id="card-portrait" src=${randomStudent.image} alt="${randomStudent.name}">
  <br>
  <h3>${randomStudent.name}</h3>
  <p>${randomStudent.house}</p>
  <p> Alternate names: ${randomStudent.alternate_names}</p>
  `;
  console.log(studentCard);
  //result.innerHTML = randomStudent.name;
});

function searchStudent(){
  const searchInput = document.getElementById("searchInput").value;
  const searchResult = document.getElementById("searchResult");
  searchResult.innerHTML = "";
  const foundStudents = allStudents.filter(function(student){
    return student.name.toLowerCase().includes(searchInput.toLowerCase());
  });
  if (foundStudents.length > 0){
    const resultList = document.createElement("ul");
    foundStudents.forEach(function(student){
      const listItem = document.createElement("li");
      listItem.innerHTML = `Name: ${student.name}, House: ${student.house}, Birthyear: ${student.yearOfBirth}`;
      resultList.appendChild(listItem);
    })
    searchResult.appendChild(resultList);
  }
  else{
    searchResult.innerHTML = `<p> No student with this name </p>`
  }

}

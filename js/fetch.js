const API = "https://hp-api.onrender.com/api/characters";

const houseImages = document
  .getElementById("house-images")
  .getElementsByTagName("img");
const studentList = document.getElementById("student-list");
const allStudents = [];
const btn_randomStudent = document.getElementById("btnRandomStudent");
const result = document.getElementById("result");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");
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
    console.log(allStudents);
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

 

function displayStudents(students) {
  studentList.innerHTML = "";
  students.forEach((student) => {
    const isAlive = student.alive;
    let age = "unknown";
    if ( student.yearOfBirth != "" && isAlive){
      age = 2023 - parseInt(student.yearOfBirth);
    }
    else if(!isAlive){
      age = "Deceased";
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

//Under arbeid
/*
searchInput.addEventListener("keyup", () => {
  const keyword = searchInput.value.toLowerCase();

  searchResult.innerHTML = "";

  students.forEach(function (student) {
    if (student.name.toLowerCase().includes(keyword)) {
      searchResult.innerHTML = student.name;
    }
  });
});*/

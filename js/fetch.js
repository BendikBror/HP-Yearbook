const API = "https://hp-api.onrender.com/api/characters";

const houseImages = document.getElementById("house-images").getElementsByTagName("img");
const studentList = document.getElementById("student-list");

fetch(API)
  .then(res => {
    // gjør om responsen til JSON data
    return res.json();
  })
  .then(data => {
    //viser alle elever når siden loades inn
    displayStudents(data);

    // filtrerer eleven etter hus når du bytter hus
    for (let i = 0; i < houseImages.length; i++) {
        const img = houseImages[i];
        img.addEventListener("click", () => {
          const selectedHouse = img.dataset.house;
          const filteredData = selectedHouse ? data.filter(student => student.house === selectedHouse) : data;
          displayStudents(filteredData);
        });
      }
})
  .catch(error => {
    console.error(error);
  });



  function displayStudents(students) {
    studentList.innerHTML = "";
    students.forEach(student => {
      const li = document.createElement("li");
  
      // ser på boolean verdien om studenten lever
    const isAlive = student.alive;
  
      // viser "uvisst" dersom yob er null.får alderen til studenten ved å ta nåværende årstall minus årstallet de ble født
      let age = "uvisst";
      if (student.yearOfBirth !== "") {
        age = 2023 - parseInt(student.yearOfBirth);
      }
      
      const ageDisplay = Number.isNaN(age) ? "" : `Age: ${age}`;
  
      let html = `<img class="portrait-img" src="${student.image}" alt="${student.name}"><br>${student.name} (${student.house})`;

  
      // dersom boolean verdien er "true", vil alderen vises, ellers vil det stå Deceased med rød skrift.
      if (isAlive) {
        html += `<br>${ageDisplay}`;
      } else {
        html += `<br><span style="color: red">Deceased</span>`;
      }
  
      li.innerHTML = html;
      studentList.appendChild(li);
    });
  }

  
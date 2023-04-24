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
      li.innerHTML = `<img class="portrait-img" src="${student.image}" alt="${student.name}"><br>${student.name} (${student.house})`;
      studentList.appendChild(li);
    });
  }
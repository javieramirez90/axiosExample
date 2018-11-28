const url = "https://ih-crud-api.herokuapp.com/characters/";
let exists = false;

function editCharacter(e) {
  // conseguir los datos si tenemos el id
  axios.get(url + e.name).then(result => {
    exists = result.data.id;
    const form = document.querySelector("form");
    // los colocamos en el form
    form.name.value = result.data.name;
    form.occupation.value = result.data.occupation;
    form.weapon.value = result.data.weapon;
  });
  // si el usuario guarda ya no estamos aqui (addCharacter)
}

function addCharacter(e) {
  e.preventDefault();
  const char = {
    name: e.target.name.value,
    occupation: e.target.occupation.value,
    weapon: e.target.weapon.value
  };
  if (exists) {
    return axios.patch(url + exists, char).then(result => {
      getCharacters();
      exists = false;
    });
  }
  axios.post(url, char).then(result => {
    getCharacters();
  });
}

function deleteCharacter(e) {
  if (!confirm("¿Seguro de borrar?")) return;
  const id = e.id;
  console.log(id);
  axios.delete(url + id).then(result => {
    getCharacters();
  });
}

function getCharacters() {
  const form = document.querySelector("form");
  form.name.value = "";
  form.occupation.value = "";
  form.weapon.value = "";
  const table = document.querySelector("table");
  table.innerHTML = `      <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Occupation</th>
      <th>weapon</th>
      <th>Delete</th>
      <th>Edit</th>
    </tr>`;
  axios.get(url).then(result => {
    // array!!!!
    result.data.forEach(c => {
      var tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.occupation}</td>
        <td>${c.weapon}</td>
        <td><button onclick="deleteCharacter(this)" class="borrar" id="${
          c.id
        }" >X</button></td> 
        <td><button onclick="editCharacter(this)" class="editar" name="${
          c.id
        }" >Edit</button></td>  
        `;
      table.appendChild(tr);
    });
  });
}

getCharacters();

//listeners
document.querySelector("form").addEventListener("submit", addCharacter);
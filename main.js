const url = " https://ih-crud-api.herokuapp.com/characters"
let exists = false;


function addCharacter(e){
  
  e.preventDefault()
  console.log(e)
  const char = {
    name: e.target.name.value,
    occupation: e.target.occupation.value,
    weapon: e.target.weapon.value
  }

  if(exists) {
    return axios.patch(url + exists, char)
  }

  axios.post(url, char)
    .then(result => {
      exists = results.data.is
      resetTable()
      getCharacters()
    }
    
  );

}

function editCharacter(e){
  console.log(e.name)
  //conseguir los datos que tenems por id
  axios.get(url + e.name)
    .then(result => {
      const form = document.querySelector("form")
      form.name.value = result.data.name;
      form.occupation.value = result.data.occupation;
      form.weapon.value = result.data.weapon;

    })
  //los colocamos en el form
  //si el usuario guarda, ya no estamos en esta función si no en addchar
}

function resetTable(){
  const table = document.querySelector("table");
      table.innerHTML= `
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Occupation</th>
          <th>Weapon</th>
          <th>Delete</th>
      </tr>
      `;
}


function deleteCharacter(e){
  const id = e.id;
  console.log(id);

  axios.delete(url + id)
    .then(result => {
      resetTable();
      getCharacters();
    })
}


function getCharacters(){
  const table = document.querySelector('table');
  axios.get(url)
  .then(result => {
    result.data //This is an array
    result.data.forEach(c => {
      var tr = document.createElement('tr');
      tr.innerHTML = `
      <tr>
      <td>${ c.id }</td>
      <td>${ c.name }</td>
      <td>${ c.occupation }</td>
      <td>${ c.weapon }</td>
      <td><button class="editar" onclick="editCharacter(this)" name="${c.id}">X</button></td>
      <td><button class="borrar" onclick="deleteCharacter(this)" id="${c.id}">X</button></td>
    </tr>
      `
      table.appendChild(tr);

      
    })
  })
}

// document.querySelector(".borrar").addEventListener('click', deleteCharacter);

getCharacters();

document.querySelector('form').addEventListener("submit", addCharacter)
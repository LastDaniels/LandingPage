let loaded = (eventLoaded) => {

  let myform = document.getElementById('subs-form');
  myform.addEventListener('submit', (eventSubmit) => {

    eventSubmit.preventDefault();
    let nombre = document.getElementById("nombre_form");
    let email = document.getElementById("email_form");
    let phone = document.getElementById("select_form");
    if (nombre_form.value.length == 0) {
      alert("Nombre requerido")
      nombre.focus()
      return;
    }
    if (email_form.value.length == 0) {
      alert("Email requerido")
      email.focus()
      return;
    }
    if (select_form.value.length == 0) {
      alert("Necesita seleccionar un telefono")
      phone.focus()
      return;
    }
    const datos = {
      nombre: nombre_form.value,
      email: email_form.value,
      phone: select_form.value
    };
    fetch('https://pruebas-5f4c7-default-rtdb.firebaseio.com/database.json', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(respuesta => respuesta.json())
      .then(datos => {
        alert("Tu respuesta ha sido guardada")
        console.log(datos); // Imprimir la respuesta del servidor
        loadVotes();
      })
      .catch(error => console.error(error));

     
  
  })
}

let loadVotes = async () => {
  const url = "https://pruebas-5f4c7-default-rtdb.firebaseio.com/database.json";

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error('Error al obtener los datos');
    }

    const datos = await respuesta.json();
    let votesMap = new Map();

  
    for (const key in datos) {
      let vote = datos[key];
      let tipoCelular = vote.phone; 

      if (votesMap.has(tipoCelular)) {
        votesMap.set(tipoCelular, votesMap.get(tipoCelular) + 1);
      } else {
        votesMap.set(tipoCelular, 1);
      }
    }


    let tableBody = document.getElementById('tablebody');

    tableBody.innerHTML = '';

    votesMap.forEach((count, celular) => {
      let row = `<tr><td style="font-size: 18px;">${celular}</td><td style="font-size: 18px;">${count}</td></tr>`;
      tableBody.innerHTML += row;
    });

  } catch (error) {
    console.error('Error al cargar los datos:', error);
    alert('Hubo un error al cargar los datos de la tabla');
  }
};

window.addEventListener("DOMContentLoaded", loaded)
document.addEventListener("DOMContentLoaded", loadVotes);


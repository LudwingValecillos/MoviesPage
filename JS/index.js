const API_KEY = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

let movies = [];

// Función para obtener las películas
fetch(`https://moviestack.onrender.com/api/movies`, {
  headers: {
    "x-api-key": API_KEY,
  },
})
  .then((response) => response.json())
  .then((data) => {
    movies = data.movies;
    crearFiltros(movies);
    crearCard(movies);
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });

//--------------------------------------------------------------


let main = document.querySelector("main");

let buscarfavoritos = () => {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  return favoritos;
};

const crearCard = (peliculas) => {
  let contenedorDiv = document.querySelector("#contenedor");

    contenedorDiv.className = "px-10 flex flex-wrap w-full gap-2 justify-center min-h-screen";
    contenedorDiv.innerHTML = ""; // Limpiar las tarjetas existentes

  let favoritos = buscarfavoritos();
  peliculas.forEach((pelicula) => {
    let cardHTML = `
      <article class="p-2 border-black border-2 rounded-lg bg-[#ffffff5d] md:w-80 ">
        <div class="flex items-end justify-end cursor-pointer">
          <img src="${favoritos.includes(pelicula.id) ? "../Recursos Moviestack/corazonRelleno.png" : "../Recursos Moviestack/corazonVacio.png"}" alt="" class="corazon" id="${pelicula.id}">
        </div>
        <a href="./details.html?id=${pelicula.id}">
          <img src="https://moviestack.onrender.com/static/${pelicula.image}" alt="${pelicula.title}" class="card-img w-full h-48 justify-center rounded-3xl">
          <h2 class="card-title text-center font-bold border-b-2 border-[#ff910058]">${pelicula.title}</h2>
          <h3 class="card-genre text-xs pl-2 font-bold text-center">${pelicula.genres.join(", ")}</h3>
          <p class="card-description text-[13px] pl-2 pt-2 text-[#000000]">${pelicula.overview}</p>
        </a>
      </article>
    `;
    contenedorDiv.innerHTML += cardHTML;
  });
  main.appendChild(contenedorDiv);


  addHeartEventListeners();
};

const addHeartEventListeners = () => {
  const corazones = document.querySelectorAll(".corazon");
  corazones.forEach(corazon => {
    corazon.addEventListener("click", toggleHeart);
  });
};

const toggleHeart = (e) => {

  let favoritos = buscarfavoritos();
  const corazon = e.target;
  
  if (corazon.src.includes("corazonVacio.png")) {
    corazon.src = "../Recursos Moviestack/corazonRelleno.png";
    favoritos.push(corazon.id);
  } else {
    corazon.src = "../Recursos Moviestack/corazonVacio.png";
    favoritos.splice(favoritos.indexOf(corazon.id), 1);
  }
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  console.log(favoritos);

};

const crearFiltros = (movies) => {

  //-----------Crear Div Filtros------------

  const divFiltros = document.createElement("div");
  divFiltros.id = "divFiltros";
  divFiltros.className = "flex flex-wrap w-full justify-center gap-2 py-5";
 
  //-----------Crear Select-----------

  const selector = document.createElement("select");
  selector.className = "p-2 border-black border-2 rounded-lg bg-[#ffffff5d] md:w-1/5";

  let listaGeneros = [...new Set(movies.flatMap((movie) => movie.genres))].sort();
  let selectHTML = `<option value="all">Genre</option>`;
  listaGeneros.forEach((genero) => {
    selectHTML += `<option value="${genero}">${genero}</option>`;
  });
  selector.innerHTML = selectHTML;
  divFiltros.appendChild(selector);

  //-----------Crear Input-----------

  const buscador = document.createElement("input");
  buscador.className = "p-2 border-black border-2 rounded-lg bg-[#ffffff5d] md:w-1/5";
  buscador.type = "text";
  buscador.placeholder = "Search Movie";
  divFiltros.appendChild(buscador);

  main.appendChild(divFiltros);

  //-----------Funcionalidad-----------
  const aplicarFiltros = () => {
    const selectedGenre = selector.value;
    const searchTerm = buscador.value.toLowerCase();

    const peliculasFiltradas = movies.filter((movie) => {
      const matchesGenre = selectedGenre === "all" || movie.genres.includes(selectedGenre);
      const matchesSearchTerm = movie.title.toLowerCase().includes(searchTerm);
      return matchesGenre && matchesSearchTerm;
    });

    crearCard(peliculasFiltradas);
  };

  selector.addEventListener("change", aplicarFiltros);
  buscador.addEventListener("input", aplicarFiltros);
};
export { addHeartEventListeners,  toggleHeart};

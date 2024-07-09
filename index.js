// Obtener la referencia al elemento <main>
let main = document.querySelector("main");

// Crear el div para los filtros
const divFiltros = document.createElement("div");
divFiltros.id = "divFiltros";
divFiltros.className = "flex flex-wrap w-full justify-center gap-2 pb-10";

// Crear el selector de géneros y el buscador
const selector = document.createElement("select");
const buscador = document.createElement("input");

// Asignar clases al selector y al buscador
selector.className = "w-1/5 p-2 border-black border-2 rounded-lg bg-[#ffffff5d]";
buscador.className = "w-1/5 p-2 border-black border-2 rounded-lg bg-[#ffffff5d]";
buscador.type = "text";
buscador.placeholder = "Search Movie";

// Función para obtener una lista de géneros únicos de las películas
const listaGeneros = (movie) => {
  let listaGeneros = [];
  
  movie.forEach((pelicula) => {
    pelicula.genres.forEach((genero) => {
      if (!listaGeneros.includes(genero)) {
        listaGeneros.push(genero);
      }
    });
  });
  
  return listaGeneros;
};

// Función para crear las opciones del selector de géneros
const crearSelect = (movies) => {
  const lista = listaGeneros(movies);
  let selectHTML = `<option value="all" disabled selected>Genre</option>`;
  
  lista.forEach((movie) => {
    selectHTML += `<option value="${movie}">${movie}</option>`;
  });
  
  return selectHTML;
};

// Asignar las opciones al selector y agregar el selector y el buscador al div de filtros
selector.innerHTML = crearSelect(movies);
divFiltros.appendChild(selector);
divFiltros.appendChild(buscador);

// Agregar el div de filtros al elemento <main>
main.appendChild(divFiltros);

// Imprimir en la consola las opciones del selector (para depuración)
console.log(crearSelect(movies));

selector.addEventListener("change", (event) => {
  // Obtener el valor del selector
  console.log(event.target.value);
  const selectedGenre = event.target.value;
  const filteredMovies = movies.filter((movie) => {
    return movie.genres.includes(selectedGenre) || selectedGenre === "all";
  });
  console.log(filteredMovies);

  contenedorDiv.innerHTML = crearCard(filteredMovies);
});

buscador.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchTerm);
  });
  contenedorDiv.innerHTML = crearCard(filteredMovies);
});

//-----------------------------------------------------------------------------------------------------------------------------------
// Crear el contenedor para las tarjetas de películas
let contenedorDiv = document.createElement("div");
contenedorDiv.id = "contenedor";
contenedorDiv.className = "flex flex-wrap w-full gap-2 justify-center";

// Función para crear las tarjetas de películas
const crearCard = (peliculas) => {
  let cardsHTML = "";
  
  peliculas.forEach((pelicula) => {
    cardsHTML += `
      <article class="w-1/5 p-2 border-black border-2 rounded-lg bg-[#ffffff5d]">
        <img src="${pelicula.image}" alt="${pelicula.title}" class="card-img w-full h-48 justify-center rounded-3xl">
        <h2 class="card-title text-center font-bold border-b-2 border-[#ff910058]">${pelicula.title}</h2>
        <h3 class="card-genre text-xs pl-2 font-bold text-center">${pelicula.genres}</h3>
        <p class="card-description text-1xl pl-2 pt-2 text-[#000000]">${pelicula.overview}</p>
      </article>
    `;
  });
  
  return cardsHTML;
};

// Asignar las tarjetas al contenedor y agregar el contenedor al elemento <main>
contenedorDiv.innerHTML = crearCard(movies);
main.appendChild(contenedorDiv);

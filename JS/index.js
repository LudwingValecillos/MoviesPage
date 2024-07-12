
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
const crearSelect = (movies) => {
  const listaGeneros = (movies) => {
    let listaGeneros = [];

    movies.forEach((pelicula) => {
      pelicula.genres.forEach((genero) => {
        if (!listaGeneros.includes(genero)) {
          listaGeneros.push(genero);
        }
      });
    });

    return listaGeneros;
  };

  const lista = listaGeneros(movies);
  let selectHTML = `<option value="all">Genre</option>`;

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
        <a href="./details.html?id=${pelicula.id}"><img src="${pelicula.image}" alt="${pelicula.title}" class="card-img w-full h-48 justify-center rounded-3xl">
        <h2 class="card-title text-center font-bold border-b-2 border-[#ff910058]">${pelicula.title}</h2>
        <h3 class="card-genre text-xs pl-2 font-bold text-center">${pelicula.genres}</h3>
        <p class="card-description text-1xl pl-2 pt-2 text-[#000000]">${pelicula.overview}</p>
      </a>
        </article>
    `;
  });

  return cardsHTML;
};

// Asignar las tarjetas al contenedor y agregar el contenedor al elemento <main>
contenedorDiv.innerHTML = crearCard(movies);
main.appendChild(contenedorDiv);

// Función para aplicar los filtros combinados

const aplicarFiltros = () => {
  const selectedGenre = selector.value;
  const searchTerm = buscador.value.toLowerCase();

  const peliculasFiltradas = movies.filter((movie) => {
    const matchesGenre = selectedGenre === "all" || movie.genres.includes(selectedGenre);
    const matchesSearchTerm = movie.title.toLowerCase().includes(searchTerm);
    console.log(matchesGenre, matchesSearchTerm);
    return matchesGenre && matchesSearchTerm;
  });
  if(peliculasFiltradas.length > 0){

  contenedorDiv.innerHTML = crearCard(peliculasFiltradas);
}else{
  contenedorDiv.innerHTML = `<h2 class="text-3xl font-bold">No se encontraron resultados</h2>`
}
};

// Event listeners para los filtros
selector.addEventListener("change", aplicarFiltros);
buscador.addEventListener("input", aplicarFiltros);

console.log(window.location.search);
let search = window.location.search;

let paramsss = new URLSearchParams(Window.location.search);


let params = new URLSearchParams('?nombre=tom&apellidos=castillo');

let paramss = new URLSearchParams({nombre: 'tom', apellidos: 'castillo'});

console.log(params);

console.log(params.get('nombre'));
// console.log(params.getAll('nombre'));

params.set('apellidos', '');
console.log(params.get('apellidos'));
// import { addHeartEventListeners, toggleHeart } from './index.js';

const API_KEY = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
let main = document.querySelector("main");

// Función para obtener las películas y filtrar las favoritas
fetch(`https://moviestack.onrender.com/api/movies`, {
  headers: {
    "x-api-key": API_KEY,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const movies = data.movies;

    const peliculasFavoritas = movies.filter((movie) => JSON.parse(localStorage.getItem("favoritos")).includes(movie.id));

    crearCardFavoritos(peliculasFavoritas);
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });

const crearCardFavoritos = (movies) => {
  let contenedorDiv = document.querySelector("#contenedorFavs");
  contenedorDiv.className = "px-10 flex flex-wrap w-full gap-2 justify-center py-2";
  contenedorDiv.innerHTML = "";
  
  movies.forEach((pelicula) => {
    let cardHTML = `
      <article class="p-2 border-black border-2 rounded-lg bg-[#ffffff5d] md:w-80 ">
        <div class="flex items-end justify-end cursor-pointer">
          <img src="../Recursos Moviestack/corazonRelleno.png" alt="" class="corazon" id="${pelicula.id}">
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

  addHeartEventListeners(); // Llama a esta función para agregar los listeners después de crear las tarjetas
};

const addHeartEventListeners = () => {
  const corazones = document.querySelectorAll(".corazon");
  corazones.forEach(corazon => {
    corazon.addEventListener("click", toggleHeart);
  });
};

const toggleHeart = (e) => {
  let favoritos = JSON.parse(localStorage.getItem("favoritos"));
  const corazon = e.target;
  favoritos.splice(favoritos.indexOf(corazon.id), 1);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  // Re-fetch y actualizar las películas favoritas
  fetch(`https://moviestack.onrender.com/api/movies`, {
    headers: {
      "x-api-key": API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const movies = data.movies;
      const peliculasFavoritas = movies.filter((movie) => favoritos.includes(movie.id));
      crearCardFavoritos(peliculasFavoritas); // Vuelve a crear las tarjetas con la lista actualizada
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
};

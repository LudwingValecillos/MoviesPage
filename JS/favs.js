
const API_KEY = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
let main = document.querySelector("main");

fetch(`https://moviestack.onrender.com/api/movies`, {
  headers: {
    "x-api-key": API_KEY,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const movies = data.movies;

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const peliculasFavoritas = movies.filter((movie) => favoritos.includes(movie.id));
    crearCardFavoritos(peliculasFavoritas);
    agregarEvenListenersCorazones();

  })

  .catch((error) => {
    console.error("Error fetching movies:", error);
  });

const crearCardFavoritos = (movies) => {

  let contenedorDiv = document.querySelector("#contenedorFavs");

  contenedorDiv.className ="px-10 flex flex-wrap w-full gap-2 justify-center py-2";

  if (movies.length == 0) {

    contenedorDiv.innerHTML ="<h2 class='text-3xl font-bold text-center py-40'>No tienes películas favoritas</h2>";

  } else {

    let cardHTML = "";
    movies.forEach((pelicula) => {
      cardHTML += `
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
    });
    contenedorDiv.innerHTML = cardHTML;

    agregarEvenListenersCorazones(); // Agregar eventos a los corazones
  }
};

const agregarEvenListenersCorazones = () => {
  const corazones = document.querySelectorAll(".corazon");
  corazones.forEach((corazon) => {
    corazon.addEventListener("click", pintarCorazones);
  });
};

const pintarCorazones = (e) => {
  let favoritos = JSON.parse(localStorage.getItem("favoritos"));
  const corazon = e.target;
  favoritos.splice(favoritos.indexOf(corazon.id), 1);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  fetch(`https://moviestack.onrender.com/api/movies`, {
    headers: {
      "x-api-key": API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const movies = data.movies;

      const peliculasFavoritas = movies.filter((movie) =>
        favoritos.includes(movie.id)
      );

      crearCardFavoritos(peliculasFavoritas);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
};

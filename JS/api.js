const apiURL = 'https://moviestack.onrender.com/api/movies'
const apiKey = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'



// Función para cargar las películas favoritas desde el Local Storage
const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'))  [];
    return favorites;
}

// Inicializar la página de favoritos
const initFavorites = () => {
    const favorites = loadFavorites();
    const allMovies = JSON.parse(localStorage.getItem('movies'))  [];
    const favoriteMovies = allMovies.filter(movie => favorites.includes(movie.id));
    const favoritesContainer = document.getElementById('favoritesContainer');
    if (favoriteMovies.length === 0) {
      favoritesContainer.innerHTML = '<p class="text-center">No hay películas favoritas.</p>';
    } else {
      cardsCreator(favoriteMovies, favoritesContainer);
    }
  };

// Llamar a la función para cargar las películas favoritas cuando se cargue la página
document.addEventListener('DOMContentLoaded', initFavorites);


const cardsCreator = (arrayMovies, container) => {
    container.classList.add(
      "flex",
      "flex-wrap",
      "mx-[10px]",
      "sm:mx-[20px]",
      "md:mx-[40px]",
      "lg:mx-[60px]",
      "my-[30px]",
      "justify-center"
    );

    let cardsCreadasHTML = "";
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    arrayMovies.forEach((movie) => {
      const isFavorite = favorites.includes(movie.id);
      const starClass = isFavorite ? 'fa-solid' : 'fa-regular';
      const cardHTML = 
        <article class="flex flex-col items-center text-center w-full sm:w-[48%] md:w-[40%] lg:w-[30%] xl:w-[22%] bg-white rounded-lg shadow-md p-4 m-2 min-h-[300px]">
         <i data-id="${movie.id}" class="${starClass} fa-star toggle"></i>    
        <a href="moviedetail.html?id=${movie.id}" class="flex flex-col items-center">
            <img src="${movie.image}" class="w-32 h-32 object-cover mt-2">
            <h2 class="text-xl font-semibold mt-2">${movie.title}</h2>
            <h3 class="text-md font-medium text-gray-700 mt-1">${movie.tagline}</h3>
            <p class="text-gray-600 flex-grow mt-2">${movie.overview}</p>
          </a>
        </article>
      ;
      cardsCreadasHTML += cardHTML;
    });
    container.innerHTML = cardsCreadasHTML;
  };
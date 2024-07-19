const main = document.querySelector("main");
main.className = "p-10 w-full bg-[#D2CCFF]";

const container = document.createElement("div");
container.id = "container";
container.className =
  "w-full flex flex-col h-full p-10 gap-10 bg-[#0000000b] shadow-2xl rounded-2xl md:flex-row";

const slideLeft = document.createElement("div");
slideLeft.id = "slide-left";
slideLeft.className = " flex flex-col justify-center items-center md:w-1/2 ";

const slideRight = document.createElement("div");
slideRight.id = "slide-right";
slideRight.className = " flex flex-col justify-evenly md:w-1/2";
//---------------------------------------

const API_KEY = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

let movies = [];
fetch(`https://moviestack.onrender.com/api/movies`, {
    headers: {
        'x-api-key': API_KEY
    }
})
.then(response => response.json())
.then(data => {
  console.log(data.movies);
  peliculaId(data.movies)
})
.catch(error => {
    console.error("Error fetching movies:", error);
});

//------------------------------------
const peliculaId = (pelis) => {
 

  const id = new URLSearchParams(window.location.search).get("id");
  const findMovieById = (movies, id) => {
    return movies.find((movie) => movie.id === id);
  };
  const pelicula = findMovieById(pelis, id);
  console.log(pelicula);

  crearSlideLeft(pelicula);

  crearSlideRight(pelicula);
  
  main.appendChild(container);
};



const crearSlideLeft = (pelicula) => {
  
  const img = document.createElement("img");
  img.src = `https://moviestack.onrender.com/static/${pelicula.image}` 
  img.alt = pelicula.title;
  img.className = "w-full rounded-2xl md:h-96";

  slideLeft.appendChild(img);

  const tabla = document.createElement("table");
  tabla.className = "mt-5 rounded-2xl";

  const table = (pelicula) => {
    return `
        <tr>
            <td>Original Lenguage</td>
            <td>${pelicula.original_language}</td>
        </tr>

        <tr>
            <td>Release Date</td>
            <td>${pelicula.release_date}</td>
        </tr>

        <tr>
            <td>Runtime</td>
            <td>${pelicula.runtime}</td>
        </tr>

        <tr>
            <td>Status</td>
            <td>${pelicula.status}</td>
        </tr>
        
    `;
  };

  tabla.innerHTML = table(pelicula);

  slideLeft.appendChild(tabla);

  container.appendChild(slideLeft);
};

const crearSlideRight = (pelicula) => {
  
  const title = document.createElement("h2");
  title.textContent = pelicula.title;
  title.className = "text-4xl font-bold border-b-8 border-[#ff910058] pb-2 text-center";

  const tagline = document.createElement("p");
  tagline.textContent = pelicula.tagline;
  tagline.className = "text-2xl font-bold";

  const genres = document.createElement("p");
  genres.textContent = "Genres: " + pelicula.genres;
  genres.className = " font-bold mt-5 md:text-3xl";

  const overview = document.createElement("p");
  overview.textContent = pelicula.overview;
  overview.className = "my-5 md:text-2xl";

  const table = (pelicula) => {
    return `
     <table>
        <tr>
            <td>Vote Average</td>
            <td>${pelicula.vote_average}</td>
        </tr>

        <tr>
            <td>Budget</td>
            <td>${pelicula.budget}</td>
        </tr>

        <tr>
            <td>Revenue</td>
            <td>${pelicula.revenue}</td>
        </tr>

    </table>
        
    `;
  };

  slideRight.appendChild(title);
  slideRight.appendChild(tagline);
  slideRight.appendChild(genres);
  slideRight.appendChild(overview);
  slideRight.innerHTML += table(pelicula);

  container.appendChild(slideRight);
};

// crearSlideLeft(pelicula);

// crearSlideRight(pelicula);


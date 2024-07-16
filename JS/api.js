// const API_KEY = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

// let movies = [];

// fetch(`https://moviestack.onrender.com/api/movies`, {
//     headers: {
//         'x-api-key': API_KEY
//     }
// })
// .then(response => response.json())
// .then(data => {
//     movies = data.movies;
//     console.log(data.movies);
//     console.log(movies); // Esto mostrará las películas en la consola
// })
// .catch(error => {
//     console.error("Error fetching movies:", error);
// });

// console.log(movies);
const API_KEY = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

async function fetchMovies() {
    try {
        const response = await fetch(`https://moviestack.onrender.com/api/movies`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const data = await response.json();
        return data.movies;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

async function initialize() {
    const movies = await fetchMovies();
    console.log(movies); // Esto mostrará las películas en la consola
    // Aquí puedes utilizar la variable movies como desees
}

initialize();
console.log(movies[0].title);

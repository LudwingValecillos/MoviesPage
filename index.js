
let main = document.querySelector('main');
let contenedorDiv = document.createElement('div');
contenedorDiv.id = 'contenedor';
contenedorDiv.classList.add("flex","flex-wrap","w-full", "gap-2", "justify-center", "py-10");
main.appendChild(contenedorDiv);
let divCreado = document.getElementById("contenedor");

function estructuraCard(nombre, foto, genero, descripcion) {
    return `
        <article class="w-1/5 p-2 border-black border-2 rounded-lg bg-[#26355d24]">
            <img src="${foto}" alt="${nombre}" class="card-img w-full h-48 justify-center  rounded-3xl">
            <h2 class="card-title text-center font-bold border-b-2 border-[#ff910058]">${nombre}</h2>
            <h3 class="card-genre text-xs pl-2 font-bold text-center">${genero}</h3>
            <p class="card-description text-1xl pl-2 pt-2 text-[#000000]">${descripcion}</p>
        </article>
    `;
}
//7
function crearCard(peliculas) {
    let cardsHTML = '';
    for (let i = 0; i < peliculas.length; i++) {
        const pelicula = peliculas[i];
        cardsHTML +=  estructuraCard(pelicula.title, pelicula.image, pelicula.genres, pelicula.overview);
    }
    
    return cardsHTML
}

let crearcards = crearCard(movies);
console.log(crearcards);
divCreado.innerHTML = crearcards;

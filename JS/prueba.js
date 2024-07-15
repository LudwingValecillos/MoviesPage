const main = document.querySelector("main");
main.className = "p-10 bg-[#D2CCFF] ";

const divContenedor = document.createElement("div");
divContenedor.className = "w-full flex flex-wrap gap-10  justify-center"

const crearCard = (peliculas) => {

    let cardsHTML = "";

    peliculas.forEach(element => {
        cardsHTML += `  <article class="w-1/5 p-2 border-black border-2 rounded-lg bg-[#ffffff5d] ">
            <img src=" ${element.image} " alt="">
            <h2 class="card-title text-center font-bold border-b-2 border-[#ff910058]"> ${element.title}</h2>
            <h3 class="card-genre text-xs pl-2 font-bold text-center"> ${element.genres}</h3>
            <p>${element.overview}</p>
        </article>`
    });
    divContenedor.innerHTML += cardsHTML
}
crearCard(movies)


main.appendChild(divContenedor);


const divDeFiltros = document.createElement("div");
divDeFiltros.id = "divFiltros";
divDeFiltros.className = "flex flex-wrap w-full justify-center gap-2 pb-10";



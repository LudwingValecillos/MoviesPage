const main = document.querySelector("main");
main.className = "p-10 bg-[#D2CCFF] ";

const divContenedor = document.createElement("div");
divContenedor.className = "w-full flex flex-wrap gap-10  justify-center"

const divFiltros = document.createElement("div");
divFiltros.id = "divFiltros";
divFiltros.className = "flex flex-wrap w-full justify-center gap-2 pb-10";

const crearFiltros = (movies) =>{

    const listaGeneros  = []
    const selector = document.createElement("select");
    selector.className = "w-1/5 p-2 border-black border-2 rounded-lg bg-[#ffffff5d]";
    selector.innerHTML = `<option value="all">Geners</option>`
    movies.forEach(generos => {
        generos.genres.forEach(genero => {
            if(!listaGeneros.includes(genero)){
                listaGeneros.push(genero)
                selector.innerHTML += `<option value="${genero}">${genero}</option>`
            }
        })
    });

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search Movie"
    input.className = "w-1/5 p-2 border-black border-2 rounded-lg bg-[#ffffff5d]";
    
    divFiltros.appendChild(input);
    divFiltros.appendChild(selector);
    divContenedor.appendChild(divFiltros)
}
crearFiltros(movies)




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




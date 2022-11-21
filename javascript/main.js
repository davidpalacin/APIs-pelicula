import { global } from "./global.js";
// DECLARACIONES
let lang = "en-EN";
let pages = ["popular", "topRated"];
let actualPage = pages["popular"];
const pageTitle = document.getElementById("page-title");

// CAMBIO DE IDIOMA
const selector = document.getElementById("idioma");
selector.value = "en-EN";
selector.addEventListener("change", function(){
    lang = document.getElementById("idioma").value;
    if(actualPage === pages[0]){
        getPopularMovies(lang);
    } 
    if(actualPage === pages[1]){
        getTopRatedMovies(lang);
    }
});

// FUNCIONES
const getPopularMovies = (lang) => {
    pageTitle.innerHTML = "Cargando...";
    fetch(
      `${global.baseUrl}/movie/popular?api_key=${global.apiKey}&language=${lang}&page=1`
    ).then(res => res.json())
    .then(data => {
        pageTitle.innerHTML = "Películas populares";
        const movies = data.results;
        renderMovies(movies);
    })
    .catch(err => console.log(err));
}
getPopularMovies();

const getTopRatedMovies = (lang) => {
    pageTitle.innerHTML = "Cargando...";
  fetch(
    `${global.baseUrl}/movie/top_rated?api_key=${global.apiKey}&language=${lang}&page=1`
  )
    .then((res) => res.json())
    .then((data) => {
      pageTitle.innerHTML = "Películas Mejor Valoradas";
      const topRated = data.results;
      console.log(topRated);
      renderMovies(topRated);
    })
    .catch((err) => console.log(err));
};

const renderMovies = (movies) => {
    console.log(movies);
    const root = document.getElementById("movies");

    // Limpiar html
    root.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
        root.innerHTML += `
        <div class='movie-item'>
            <img src='${global.imageUrl}${movies[i].poster_path}'/>
            <p>${movies[i].title}</p>
            <p>${movies[i].release_date}</p>
        </div>`;
    }
}

// MAIN
const btnTopRatedMovies = document.getElementById("top-rated-movies");
const btnPopularMovies = document.getElementById("popular-movies");
btnTopRatedMovies.addEventListener("click", () => {
    getTopRatedMovies(lang);
    actualPage = pages[1];

});
btnPopularMovies.addEventListener("click", () => {
    getPopularMovies(lang);
    actualPage = pages[0];
});
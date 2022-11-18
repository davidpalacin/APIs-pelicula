import { global } from "./global.js";

// Cambio de idioma
const selector = document.getElementById("idioma");
selector.value = "en-EN";
selector.addEventListener("change", function(){
    const lang = document.getElementById("idioma").value;
    console.log(`El nuevo idioma es: ${lang}`);
    getPopularMovies(lang);
});

const getPopularMovies = (lang) => {
    fetch(
      `${global.baseUrl}/movie/popular?api_key=${global.apiKey}&language=${lang}&page=1`
    ).then(res => res.json())
    .then(data => {
        console.log("Datos listos");
        const movies = data.results;
        renderMovies(movies);
    })
    .catch(err => console.log(err));
}

console.log("Cargando datos...");
getPopularMovies();

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
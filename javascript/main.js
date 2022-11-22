import { global } from "./global.js";
// DECLARACIONES
let lang = "en-EN";
let section = "popular";
const pageTitle = document.getElementById("page-title");
const btnTopRatedMovies = document.getElementById("top-rated-movies");
const btnPopularMovies = document.getElementById("popular-movies");
const selector = document.getElementById("idioma");
const root = document.getElementById("movies");
pageTitle.innerHTML = "Películas más populares";

// CAMBIO DE IDIOMA
selector.value = "en-EN";
selector.addEventListener("change", function () {
  lang = document.getElementById("idioma").value;
  getAllMovies(lang, section);
});

// FUNCIONES
const getAllMovies = async (lang, section) => {
  try {
    const api = `${global.baseUrl}/movie/${section}?api_key=${global.apiKey}&language=${lang}&page=1`;
    let apiResult = await axios.get(api);
    let movies = apiResult.data.results;
    renderMovies(movies);
    addingEnterFuntion();
  } catch (error) {
    console.error(error);
  }
};
getAllMovies(lang, section);

const addingEnterFuntion = () => {
  const uiMovies = document.getElementsByClassName("movie-item");
  for (let i = 0; i < uiMovies.length; i++) {
    uiMovies[i].addEventListener("click", () => {getMovieDetails(uiMovies[i].id)});
  }
}

const getMovieDetails = async(id) => {
  console.log(id);
}

const renderMovies = (movies) => {
  let moviesStr = "";

  // Limpiar html
  root.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    moviesStr += `
    <div id='${movies[i].id}' class='movie-item'>
      <img src='${global.imageUrl}${movies[i].poster_path}'/>
      <p>${movies[i].title}</p>
      <p>${movies[i].release_date}</p>
    </div>`;
  }
  root.innerHTML = moviesStr;
};

btnTopRatedMovies.addEventListener("click", () => {
  section = "top_rated";
  pageTitle.innerHTML = "Películas mejor votadas";
  getAllMovies(lang, section);
});
btnPopularMovies.addEventListener("click", () => {
  section = "popular";
  pageTitle.innerHTML = "Películas más populares";
  getAllMovies(lang, section);
});

// FUNCION DE PELÍCULAS POPULARES
// const getPopularMovies = async (lang) => {
//   pageTitle.innerHTML = "Cargando...";
// con then catch
// fetch(
//   `${global.baseUrl}/movie/popular?api_key=${global.apiKey}&language=${lang}&page=1`
// ).then(res => res.json())
// .then(data => {
//     pageTitle.innerHTML = "Películas populares";
//     const movies = data.results;
//     renderMovies(movies);
// })
// .catch(err => console.log(err));

// con async await y fetch
//   setTimeout(async()=>{
//     const api = `${global.baseUrl}/movie/popular?api_key=${global.apiKey}&language=${lang}&page=1`;
//     let data = await fetch(api);
//     data = await data.json();
//     const movies = data.results;
//     pageTitle.innerHTML = "Películas populares";
//     renderMovies(movies);
//   }, 1000);
// };
// getPopularMovies();

// const getTopRatedMovies = async (lang) => {
//   pageTitle.innerHTML = "Cargando...";
//   fetch(
//     `${global.baseUrl}/movie/top_rated?api_key=${global.apiKey}&language=${lang}&page=1`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       pageTitle.innerHTML = "Películas Mejor Valoradas";
//       const topRated = data.results;
//       console.log(topRated);
//       renderMovies(topRated);
//     })
//     .catch((err) => console.log(err));

// con async await y fetch
// const api = `${global.baseUrl}/movie/top_rated?api_key=${global.apiKey}&language=${lang}&page=1`;
// let data = await fetch(api);
// data = await data.json();
// const movies = data.results;
// pageTitle.innerHTML = "Películas Mejor Valoradas";
// renderMovies(movies);

// con async await y axios
//   setTimeout(async() => {
//     const api = `${global.baseUrl}/movie/top_rated?api_key=${global.apiKey}&language=${lang}&page=1`;
//     let apiResult = await axios.get(api);
//     let movies = apiResult.data.results;
//     pageTitle.innerHTML = "Películas Mejor Valoradas";
//     renderMovies(movies);
//   }, 1000);
// };

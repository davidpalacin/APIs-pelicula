import { global } from "./global.js";
// DECLARACIONES
let lang = "en-EN";
let section = "popular";
const btnTopRatedMovies = document.getElementById("top-rated-movies");
const btnPopularMovies = document.getElementById("popular-movies");
const selector = document.getElementById("idioma");
const pageTitle = document.getElementById("page-title");
const root = document.getElementsByClassName("container")[0];
const uiMovieRating = document.getElementsByClassName("movie-item-rating");
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
    uiMovies[i].addEventListener("click", () => {
      getMovieDetails(uiMovies[i].id);
    });
  }
};

const getMovieDetails = async (id) => {
  const req = `https://api.themoviedb.org/3/movie/${id}?api_key=${global.apiKey}&language=${lang}`;
  let res = await axios.get(req);
  res = res.data;
  renderDetails(res);
};

const renderDetails = (res) => {
  let htmlDetails = `
  <div class="container-detail">
    <div class="container-detail-image">
      <img id="img-movie" src="${global.imageUrl}${res.poster_path}" alt="portada">
    </div>
    <div class="container-detail-info">
      <h1 id="container-detail-info-title">${res.title}</h1>
      <p id="container-detail-info-description"> ${res.overview}</p>
      <p id="container-detail-info-rating">🏆  ${res.vote_average}</p>
    </div>
  </div>          
  `;
  root.innerHTML = htmlDetails;
};

const renderMovies = (movies) => {
  let moviesStr = "<div id='movies'>";

  // Limpiar html
  root.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    moviesStr += `
    <div id='${movies[i].id}' class='movie-item'>
      <img src='${global.imageUrl}${movies[i].poster_path}'/>
      <div class='movie-item-rating'>${movies[i].vote_average}</div>
      <p>${movies[i].title}</p>
    </div>`;
  }
  moviesStr += "</div>";
  root.innerHTML = moviesStr;
  printRatingColors();
};
const printRatingColors = () => {
  Array.from(uiMovieRating).forEach(rating => {
    if(rating.innerHTML < 5) {
      rating.style.color = "red";
      rating.style.border = "2px solid red";
    } else if (rating.innerHTML<7){
      rating.style.color = "orange";
      rating.style.border = "2px solid orange";
    }else{
      rating.style.color = "green";
      rating.style.border = "2px solid green";
    }
  });
}

btnTopRatedMovies.addEventListener("click", () => {
  section = "top_rated";
  pageTitle.innerHTML = "Películas mejor votadas";
  getAllMovies(lang, section, btnTopRatedMovies.value);
});
btnPopularMovies.addEventListener("click", () => {
  section = "popular";
  pageTitle.innerHTML = "Películas más populares";
  getAllMovies(lang, section, btnPopularMovies.value);
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

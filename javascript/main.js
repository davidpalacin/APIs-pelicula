import { global } from "./global.js";
// DECLARACIONES
let lang = "en-EN";
let section = "popular";
let genre;
let genreName;
let guestSession;
let session = {
  request_token: "",
  session_id: "",
};
const btnTopRatedMovies = document.getElementById("top-rated-movies");
const btnPopularMovies = document.getElementById("popular-movies");
const btnCategories = document.getElementById("categories");
const selector = document.getElementById("idioma");
const root = document.getElementsByClassName("container")[0];
const uiGenres = document.getElementsByClassName("box-genres-item");
const uiMovieRating = document.getElementsByClassName("movie-item-rating");
const spinner = document.getElementById("spinner");
const spinnerUserBox = document.getElementById("spinner-user-box");
const userProfile = document.getElementById("navbar-profileIcon");
const userProfileMenu = document.getElementById("user-profile-box");
const btnCreateGuestSession = document.getElementById(
  "btn-create-guest-sesion"
);
const btnMisListas = document.getElementById("btn-mis-listas");
const btnCrearLista = document.getElementById("btn-crear-lista");
const btnGrantPermissions = document.getElementById("btn-grant-permissions");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");

// CAMBIO DE IDIOMA
selector.value = "en-EN";
selector.addEventListener("change", function () {
  lang = selector.value;
  if (section == "popular") {
    getPopularMovies();
  } else if (section == "top_rated") {
    getTopRatedMovies();
  } else if (section == "genres_list") {
    getGenresList();
  } else if (section.includes("details_")) {
    let idMovieDetail = section.split("details_").pop();
    getMovieDetails(idMovieDetail);
  } else if (section == "movies_by_genre") {
    getMoviesByGenre(genre, genreName);
  }
});

// FUNCIONES
const showSpinner = () => {
  spinner.style.display = "block";
};

const hideSpinner = () => {
  spinner.style.display = "none";
};

const showSpinnerUserBox = () => {
  spinnerUserBox.style.display = "block";
};

const hideSpinnerUserBox = () => {
  spinnerUserBox.style.display = "none";
};

const getPopularMovies = async () => {
  try {
    showSpinner();
    root.innerHTML = "";
    setTimeout(async () => {
      const api = `${global.baseUrl}/movie/popular?api_key=${global.apiKey}&language=${lang}&page=1`;
      let apiResult = await axios.get(api);
      let movies = apiResult.data.results;
      renderMovies(movies, "Películas populares");
      addingEnterFuntion();
      hideSpinner();
    }, 1000);
  } catch (error) {
    console.error(error);
  }
};

const getTopRatedMovies = async () => {
  try {
    showSpinner();
    root.innerHTML = "";
    setTimeout(async () => {
      const api = `${global.baseUrl}/movie/top_rated?api_key=${global.apiKey}&language=${lang}&page=1`;
      let apiResult = await axios.get(api);
      let movies = apiResult.data.results;
      renderMovies(movies, "Películas mejor votadas");
      addingEnterFuntion();
      hideSpinner();
    }, 1000);
  } catch (error) {
    console.error(error);
  }
};

const getMovieDetails = async (id) => {
  section = `details_${id}`;
  const req = `https://api.themoviedb.org/3/movie/${id}?api_key=${global.apiKey}&language=${lang}`;
  let res = await axios.get(req);
  res = res.data;
  renderDetails(res);
};

const getGenresList = async () => {
  const req = `https://api.themoviedb.org/3/genre/movie/list?api_key=${global.apiKey}&language=${lang}`;
  let res = await axios.get(req);
  res = await res.data;
  renderGenres(res);
  addEnterGenre();
};

const addingEnterFuntion = () => {
  const uiMovies = document.getElementsByClassName("movie-item");
  for (let i = 0; i < uiMovies.length; i++) {
    uiMovies[i].addEventListener("click", () => {
      getMovieDetails(uiMovies[i].id);
    });
  }
};

const renderDetails = (res) => {
  root.innerHTML = `
  <div class="container-detail">
    <div class="container-detail-image">
      <img id="img-movie" src="${global.imageUrl}${
    res.poster_path
  }" alt="portada">
    </div>
    <div class="container-detail-info">
      <h1 id="container-detail-info-title">${res.title}</h1>
      <p id="container-detail-info-description"> ${checkDescription(
        res.overview
      )}</p>
      <p id="container-detail-info-rating">🏆  ${res.vote_average}</p>
    </div>
  </div>          
  `;
};

const renderMovies = (movies, section) => {
  let moviesStr = `<h1 id='page-title'>${section}</h1><div id='movies'>`;

  for (let i = 0; i < movies.length; i++) {
    moviesStr += `
    <div id='${movies[i].id}' class='movie-item'>
      <img src='${global.imageUrl}${movies[i].poster_path}'/>
      <div class='movie-item-rating'>${movies[i].vote_average}</div>
      <p class='movie_title'>${movies[i].title}</p>
    </div>`;
  }
  moviesStr += "</div>";
  root.innerHTML = moviesStr;
  printRatingColors();
};

const printRatingColors = () => {
  Array.from(uiMovieRating).forEach((rating) => {
    if (rating.innerHTML < 5) {
      rating.style.color = "red";
      rating.style.border = "2px solid red";
    } else if (rating.innerHTML < 7) {
      rating.style.color = "orange";
      rating.style.border = "2px solid orange";
    } else if (rating.innerHTML < 8) {
      rating.style.color = "#b3b300";
      rating.style.border = "2px solid #b3b300";
    } else {
      rating.style.color = "green";
      rating.style.border = "2px solid green";
    }
  });
};

const addEnterGenre = () => {
  for (let i = 0; i < uiGenres.length; i++) {
    uiGenres[i].addEventListener("click", () => {
      genre = uiGenres[i].id.split("genre").pop();
      genreName = uiGenres[i].innerHTML.split("📺").pop();
      getMoviesByGenre(genre, genreName);
    });
  }
};

const getMoviesByGenre = async (genre, genreName) => {
  section = `movies_by_genre`;
  const req = `${global.baseUrl}/discover/movie?api_key=${global.apiKey}&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`;
  let res = await axios.get(req);
  res = await res.data;
  res = res.results;
  renderMovies(res, `Movies in ${genreName}`);
  addingEnterFuntion();
};

const generateGuestSession = async () => {
  try {
    showSpinnerUserBox();
    const req = await axios.get(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=ca50f336846786df17f43f4b8ea96662"
    );
    guestSession = req.data;
    hideSpinnerUserBox();
  } catch (error) {
    console.error(error);
  }
};

const getRequestToken = async () => {
  const req = `${global.baseUrl}/authentication/token/new?api_key=${global.apiKey}`;
  const res = await axios.get(req);
  session.request_token = res.data.request_token;
  console.log("request token en la funcion:");
  console.log(session);
};

const createSessionId = async () => {
  const req = `https://api.themoviedb.org/3/authentication/session/new?api_key=ca50f336846786df17f43f4b8ea96662`;
  await axios
    .post(req, {
      request_token: session.request_token,
    })
    .then((response) => {
      alert("TMDB tiene los permisos necesarios y has iniciado sesión.");
      session.session_id = response.data.session_id;
      console.log(session);
    })
    .catch((error) => {
      alert("Primero debes otorgar permisos a TMDB");
      console.log(error);
    });
};

// Crear una lista cuando el usuario ya tiene sesión iniciada.
const createList = () =>{
  const req = `${global.baseUrl}/list?api_key=${global.apiKey}&session_id=${session.session_id}`;
  axios.post(req, {
    name: "This is my awesome test list.",
    description: "Just an awesome list dawg.",
    language: "en"
  })
  .then((response)=>{
    console.log(response);
  })
  .catch((error)=>{
    console.log(error);
  })
}

const closeSession = () => {
  const req = `https://api.themoviedb.org/3/authentication/session?api_key=ca50f336846786df17f43f4b8ea96662`;
  axios
    .delete(req, {
      data: {
        session_id: session.session_id,
      },
    })
    .then((response) => {
      console.log("Se ha podido cerrar la sesión");
      console.log(response);
    })
    .catch((error) => {
      console.log("no se cierra sesion");
      console.log(error);
    });
};

const checkDescription = (data) => {
  if (data === "") {
    return `Por el momento, esta información no está disponible en el idioma ${lang}`;
  } else {
    return data;
  }
};

const getUsername = async() => {
  console.log(`Me ha llegado la sesión ---> ${session.session_id}`);
  const req = `https://${global.baseUrl}/account?api_key=${global.apiKey}&session_id=${session.session_id}`;
  const result = await axios.get(req);
  console.log(result);
}

const renderGenres = (cats) => {
  cats = cats.genres;
  let htmlCats = `<h1 id='page-title'>Categorías</h1><div class="box-genres"><div class="box-genres-column">`;
  let cont = 1;

  for (let i = 0; i < cats.length; i++) {
    if (cont <= 4) {
      htmlCats += `
        <div id='genre${cats[i].id}' class="box-genres-item">📺${cats[i].name}</div>
      `;
    } else {
      htmlCats += `</div>`;
      if (cats[i + 1] != "") {
        htmlCats += `<div class="box-genres-column">`;
      }
      cont = 0;
    }
    cont++;
  }
  htmlCats += "</div>";
  console.log(htmlCats);
  root.innerHTML = htmlCats;
};

btnTopRatedMovies.addEventListener("click", () => {
  section = "top_rated";
  getTopRatedMovies();
});

btnPopularMovies.addEventListener("click", () => {
  section = "popular";
  getPopularMovies();
});

btnCategories.addEventListener("click", () => {
  section = "genres_list";
  getGenresList();
});

btnCreateGuestSession.addEventListener("click", () => {
  generateGuestSession();
});

btnCrearLista.addEventListener("click", () => {
  createList();
});

btnMisListas.addEventListener("click", ()=>{
  getUsername();
});

btnGrantPermissions.addEventListener("click", async () => {
  await getRequestToken();
  console.log("en el addeventlistener es " + session.request_token);
  window.open(
    `https://www.themoviedb.org/authenticate/${session.request_token}`,
    "_blank"
  );
});

btnLogin.addEventListener("click", async() => {
  createSessionId();
});

btnLogout.addEventListener("click", () => {
  closeSession();
});

userProfile.addEventListener("click", () => {
  userProfileMenu.style.display === "none"
    ? (userProfileMenu.style.display = "flex")
    : (userProfileMenu.style.display = "none");  
});

getPopularMovies();

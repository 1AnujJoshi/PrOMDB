// get elements 
const movieTitle = document.getElementById('title');
const movieList = document.getElementById('movie-list');
const resultDiv = document.getElementsByClassName('result-container');
const poster = document.getElementById('poster-container');
const info = document.getElementById('info-container');

//getMovies function will get receive movie data as a json object in response
async function getMovies(searchTerm) {
    const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=3046400b`
    const response = await fetch(`${url}`);
    const data = await response.json(); 
        displayMovieList(data.Search);
}

// when user starts typing this function shows results quickly while typing
function searchMovies() {
    let movieValue = movieTitle.value.trim();
      if (movieValue.length > 0) {
        movieList.classList.remove('hide');
        getMovies(movieValue);
    } else {
        movieList.classList.add('hide');
    }
}

//  this function will display list like the suggestions
function displayMovieList(movies) {
    movieList.innerHTML = "";
    for (let i = 0; i < movies.length; i++){
        let listItem = document.createElement('div');
        listItem.dataset.id = movies[i].imdbID;
        listItem.classList.add('search-list-items');

        listItem.innerHTML = `<p> <strong>${ movies[i].Title}</strong>  </p>
                              <p>${movies[i].Year}</p>`;
        movieList.appendChild(listItem);
    }
    loadMovieDetails();
}
// this function will load details of the movie
function loadMovieDetails(){
    const searchListMovies = movieList.querySelectorAll('.search-list-items');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async() => {
            movieList.classList.add('hide');
            movieTitle.classList.add('hide');
            title.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=3046400b`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);

        })
    });
}

// this function will display results in poster and info div by creating elements inside the respective containers
function displayMovieDetails(movie) {
    let img = movie.Poster;     // store image url in variable
    let posterImg = document.createElement("img");
    posterImg.src = `${img}`;   // store url in created element
    poster.appendChild(posterImg);
    info.innerHTML =
     `
    <p class="highlight" id="info-title" > Title: ${movie.Title} <p>
    <p> Year: ${movie.Year} <p>
    <p>Rated: ${movie.Rated}</p>
    <p> Released:${movie.Released}</p>
    <p> Runtime: ${movie.Runtime} </p>
    <p> Genre: ${movie.Genre}</p>
    <p> Writer: ${movie.Writer}</p>
    <p class="highlight"> Director:  ${movie.Director}</p>
    <p class="highlight">Actors: ${movie.Actors}</p>
    <p>Plot: ${movie.Plot}</p>
    <p>Language: ${movie.Language}</p>
    <p> Awards: ${movie.Awards}</p>
    <p> imdbRating: ${movie.imdbRating}</p>
     <p> Country: ${movie.Country}</p>
    `
    ;
}

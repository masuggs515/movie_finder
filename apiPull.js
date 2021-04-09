const APIKey = '5017878af2904c84c399188a048cf26a';
const imageUrl = 'https://image.tmdb.org/t/p/w500'
const endPoint = 'https://api.themoviedb.org/3/search/movie?api_key=5017878af2904c84c399188a048cf26a';


function generateUrl(path){
  const endPoint = `https://api.themoviedb.org/3${path}?api_key=5017878af2904c84c399188a048cf26a`;
  return endPoint;
}

function requestMovies(url, onComplete, onError){
  fetch(url)
  .then((res) => res.json())
  .then(onComplete)
  .catch((onError));
}

function searchMovie(value) {
  const path = '/search/movie';
  const url = generateUrl(path) + '&query=' + value;

  requestMovies(url, renderSearchMovies, handleError);
}

function newReleases() {
  const path = '/movie/upcoming';
  const url = generateUrl(path);

  const render = renderMovies.bind({ title: 'Upcoming Movies' });
  requestMovies(url, render, handleError);
}

function topRated() {
  const path = '/movie/top_rated';
  const url = generateUrl(path);

  const render = renderMovies.bind({ title: 'Top Rated Movies' });
  requestMovies(url, render, handleError);
}

function popularMovie() {
  const path = '/movie/popular';
  const url = generateUrl(path);

  const render = renderMovies.bind({ title: 'Most Popular Movies' });
  requestMovies(url, render, handleError);
}
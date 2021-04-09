// HTML layout

/* <div class="movie">
  <section class="section">

    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/uy1JL3dsVPMDoWzZjRKdIEcbDAI.jpg" alt="" data-movie-id="642547">

    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" alt="" data-movie-id="27205">

  </section>
  <div class="content">
    <p id="content-close">X</p>
  </div>
</div> */

const searchButton = document.getElementById('search');
const inputVal = document.querySelector('#inputValue');
const moviesSearchable = document.querySelector('#movies-searchable');
const moviesContainer = document.querySelector('#movies-container');




function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path){
    return `<img 
      src=${imageUrl + movie.poster_path} 
      data-movie-id=${movie.id}>`;
  }
  })
}

function createMovieContainer(movies, title = '') {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');

  const movieTemplate = `
  <h2>${title}</h2>
  <section class="section">
  ${movieSection(movies)}
  </section>
  <div class="content">
    <p id="content-close">X</p>
  </div>
  `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

function renderSearchMovies(data){
  moviesSearchable.innerHTML = '';
  const movies = data.results;
      const movieBlock = createMovieContainer(movies);
      moviesSearchable.appendChild(movieBlock);
};

function renderMovies(data){
  const movies = data.results;
      const movieBlock = createMovieContainer(movies, this.title);
      moviesContainer.appendChild(movieBlock);
};

function handleError(error){
  console.log('Error: ', error)
}

searchButton.onclick = function (e) {
  e.preventDefault();
  const value = inputVal.value;
  searchMovie(value);
} 

function createIframe(video){
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe;
}

function createVideoTemplate(data, content){

  content.innerHTML = '<p id="content-close">Close previews</p>';
  const videos = data.results;
  const length = videos.length > 4 ? 4 : videos.length;
  const iframeContainer = document.createElement('div');

  for(let i = 0; i<length; i++){
    const video = videos[i];
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }
}

// Event delegation
document.onclick = function (e){
  const target = e.target;

  if(target.tagName.toLowerCase() === 'img'){
    const movieId = target.dataset.movieId;
    const section = e.target.parentElement;
    const content = section.nextElementSibling;
    content.classList.add('content-display');

    const path = `/movie/${movieId}/videos`;
    const endPoint = generateUrl(path);

    // fetch movie trailer
    fetch(endPoint)
    .then((res) => res.json())
    .then((data)=> createVideoTemplate(data, content))
    .catch((error) => {
      console.log('error: ', error);
    });

  }
  if(target.id === 'content-close'){
    const content = target.parentElement;
    content.classList.remove('content-display');
  }
}

newReleases();

topRated();

popularMovie()
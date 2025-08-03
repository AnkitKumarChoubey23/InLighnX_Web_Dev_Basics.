// Replace with your actual API key
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://www.omdbapi.com/';

const searchInput = document.querySelector('.search-box input');
const movieContainer = document.querySelector('.movie-container');

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    const movies = await fetchMovies(query);
    renderMovies(movies);
  } else {
    movieContainer.innerHTML = '';
  }
});

async function fetchMovies(title) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${title}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

function renderMovies(movies) {
  movieContainer.innerHTML = movies
    .map(
      (movie) => `
    <div class="movie-card">
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}" />
      <div class="movie-info">
        <h3 class="movie-title">${movie.Title}</h3>
        <p class="movie-rating">Year: ${movie.Year}</p>
      </div>
    </div>
  `
    )
    .join('');
}
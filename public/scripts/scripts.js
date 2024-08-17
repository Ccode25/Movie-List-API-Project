let currentPage = 1;

function nextPage() {
  currentPage++;
  console.log(currentPage);
  updateURLAndFetch(currentPage);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updateURLAndFetch(currentPage);
  }
}


 

    // Handle keypress event on document
    $(document).on('keypress', function(e) {
      if (e.which === 13) { 
        e.preventDefault(); 
        const inputQuery = $('#search-input').val().trim();
        console.log(inputQuery); 
        if(inputQuery) {
          renderSearchMovies(inputQuery)
        }
        
      }
    });
  // });
function movieContent(movie) {
  return `
    <div class="movie_card" id="bright">
      <div class="info_section">
        <div class="movie_header">
          <img class="locandina" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title}" />
          <h1>${movie.original_title}</h1>
          <h4 class="text-lead fs-4 mb-3">${movie.release_date}</h4>
        </div>
        <div class="movie_desc">
          <p class="text pb-4">${movie.overview}</p>
        </div>
      </div>
      <div class="blur_back bright_back" style="background-image: url('https://image.tmdb.org/t/p/w500/${movie.backdrop_path}');"></div>
    </div>
  `;
}

function updateURLAndFetch(page) {
  // Update the browser's URL without reloading the page
  const newUrl = `/movies?page=${page}`;
  window.history.pushState({ page }, `Page ${page}`, newUrl);

  // Fetch the new page's data
  renderMovies(page);
}

function updateSearchURLAndFetch(query) {
  // Update the browser's URL without reloading the page
  const newUrl = `/movies?query=${query}`; 
  window.history.pushState({ query }, `Query ${query}`, newUrl);

  // Fetch the search results
  renderSearchMovies(query);
}

async function movieData(page) {
  const yourBearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VkMjBlMDU3ZjY3YzA0Njc4ODQyMWJhZTA3NjI1NiIsIm5iZiI6MTcyMjg3MzQ1Mi4yNTQzNjMsInN1YiI6IjY2YjBmNGJmNTUwNDZjZjIzOWViNzc4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0omKPI04MmliYldMTJUoYWreUqHUj9DlinE5-HDU6TE';
  const config = { 
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    } 
  };

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?page=${page}`, config);
    return response.data; // Return data for further use
  } catch (error) {
    console.error('Fetch error:', error);
    return { results: [] }; // Return an empty array in case of error
  }
}

async function searchData(query) {
  const yourBearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VkMjBlMDU3ZjY3YzA0Njc4ODQyMWJhZTA3NjI1NiIsIm5iZiI6MTcyMjg3MzQ1Mi4yNTQzNjMsInN1YiI6IjY2YjBmNGJmNTUwNDZjZjIzOWViNzc4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0omKPI04MmliYldMTJUoYWreUqHUj9DlinE5-HDU6TE';
  const config = { 
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    } 
  };

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, config);
    return response.data; // Return data for further use
  } catch (error) {
    console.error('Fetch error:', error);
    return { results: [] }; // Return an empty array in case of error
  }
}

async function renderMovies(page) {
  const data = await movieData(page);
  const movies = data.results || []; // Ensure results is an array

  $('#movie-container').empty(); // Clear existing content

  movies.forEach(movie => {
    const content = movieContent(movie);
    $('#movie-container').append(content);
  });
}

async function renderSearchMovies(inputQuery) {
  const data = await searchData(inputQuery);
  const movies = data.results || []; // Ensure results is an array

  $('#movie-container').empty(); // Clear existing content

  movies.forEach(movie => {
    const content = movieContent(movie);
    $('#movie-container').append(content);
  });
}

function searchFunction() {
  const query = document.getElementById("search-input").value.trim();
  console.log(query);
}

// Handle the browser's back/forward navigation
window.addEventListener('popstate', (event) => {
  if (event.state) {
    if (event.state.page) {
      currentPage = event.state.page;
      updateURLAndFetch(currentPage);
    } else if (event.state.query) {
      updateSearchURLAndFetch(event.state.query);
    }
  }
});

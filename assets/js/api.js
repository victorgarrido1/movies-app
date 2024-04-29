// This fetch request is responsible for fetching the index.html
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzNhNGM2NWM0YmIxNjQyYmQxZGIwNDdiMGFiYmMwYyIsInN1YiI6IjY1Njk3ZjVjZWVlMTg2MDBhZTYzNmI0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IwECgYGXPKl2a4YxM9NGuyM-TIDJOXXpJSlaeQz6NL4",
  },
};

async function getTrendingFilms() {
  try {
    // Fetch data from the API
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options // Pass options to fetch
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    // Parse response data as JSON
    const data = await response.json();

    // Extract movie titles from the data
    // console.log(data);
    const movieTitles = data.results.map((movie) => movie.original_title);
    const overviews = data.results.map((movie) => movie.overview);

    //extract the poster from the data
    const posterPaths = data.results.map((movie) => movie.poster_path);

    // Select all elements with the class "movie-title"
    const titleElements = document.querySelectorAll(".movie-title");
    ///select all elements with the class of  movie description

    // Iterate over the title elements and update their text content
    titleElements.forEach((titleElement, index) => {
      titleElement.textContent = movieTitles[index] || "No title available";
    });

    const overviewElements = document.querySelectorAll(".movie-description");

    overviewElements.forEach((overviewElement, index) => {
      overviewElement.textContent =
        overviews[index] || "No description available";
    });

    const posterElements = document.querySelectorAll(".movie-poster");

    // Iterate over posterElements and update src attribute
    posterElements.forEach((posterElement, index) => {
      // Construct the full URL for the poster image
      const posterURL = `https://image.tmdb.org/t/p/w500${
        posterPaths[index] || ""
      }`;

      // Update the src attribute of the current posterElement
      posterElement.src = posterURL;
    });
  } catch (err) {
    // Handle errors
    console.error(err);
  }
}

getTrendingFilms();

//End

// Gets data from the DOM
// Selecting input field and button
let inputMovie = document.querySelector(".movie-search-input");
let movieBtn = document.querySelector(".movie-search-btn");


const userCardTemplate = document.querySelector("[data-user-template]");
console.log(userCardTemplate);


// Function to perform movie search
async function searchMovie(query) {
  const searchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzNhNGM2NWM0YmIxNjQyYmQxZGIwNDdiMGFiYmMwYyIsInN1YiI6IjY1Njk3ZjVjZWVlMTg2MDBhZTYzNmI0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IwECgYGXPKl2a4YxM9NGuyM-TIDJOXXpJSlaeQz6NL4'
    }
  };

  try {
    // Fetch movie data from the API using async/await
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, searchOptions);
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    // Parse response as JSON
    return response.json();  
  
    // Redirect to search-results page with the movie data
  } catch (error) {
    console.error(error); // Handle errors
  }
}

// Event listener for the button click
movieBtn.addEventListener("click", function(e) {

  e.preventDefault(); // Prevent default form submission behavior
  
  const query = inputMovie.value; // Get the value typed by the user
  
 let results = searchMovie(query);  // Call the searchMovie function with the user's query
 console.log(results);


 
});
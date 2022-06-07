const searchField = document.getElementById("search-field")
const searchButton = document.getElementById("search-btn")
const movieList = document.getElementById("movie-list")
searchButton.addEventListener("click", getMovies)
function handleWatchlist() {
    if (localStorage.getItem(this.id)) {
        localStorage.removeItem(this.id)
        this.innerHTML = `<img class="icon watchlist-icon" src="icons/add.svg"></img> Watchlist`

    } else {
        localStorage.setItem(this.id, this.id)
        this.innerHTML = `<img class="icon watchlist-icon" src="icons/remove.svg"></img> Remove`
    }

}

function checkWatchlist(id) {

}

function getMovies() {
    event.preventDefault()
    movieList.innerHTML = ""
    fetch(`https://www.omdbapi.com/?apikey=a505d3c&s=${searchField.value}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "False") {
                movieList.innerHTML = "<h3>Unable to find any results. Try another search.</h3>"
            } else {
                data.Search.map(item => {
                    fetch(`https://www.omdbapi.com/?apikey=a505d3c&i=${item.imdbID}`)
                        .then(res => res.json())
                        .then(data => {
                            let movies = []
                            movies.push(data)
                            movies.map(movie => movieList.innerHTML += `
                                <div class="flex movie-container">
                                    <div class="flex movie-container-poster">
                                        <img class="movie-poster" src=${movie.Poster} alt="N/A"/>
                                    </div>
                                    <div class="movie-container-info">
                                        <div class="flex">
                                            <h2>${movie.Title}</h2>
                                            <p>⭐${movie.imdbRating}</p>
                                        </div>
                                        <div class="flex">
                                            <p>${movie.Runtime}</p>
                                            <p>${movie.Genre}</p>
                                            <button class="watchlist-btn" id=${movie.imdbID}>
                                                ${!localStorage.getItem(movie.imdbID)
                                                    ? `<img class="icon watchlist-icon" src="icons/add.svg"></img> Watchlist`
                                                    : `<img class="icon watchlist-icon" src="icons/remove.svg"></img> Remove`
                                                }
                                            </button>
                                        </div>
                                        <div class="flex">
                                            <p>${movie.Plot}</p>
                                        </div>
                                    </div>
                                </div>
                                `)
                            const movieButtons = document.querySelectorAll(".watchlist-btn")
                            movieButtons.forEach(button => {
                                button.addEventListener("click", handleWatchlist)
                            })
                        })
                })
            }
        }
        )
}

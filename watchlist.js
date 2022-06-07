const watchlist = document.getElementById("watchlist-html")
const allKeys = Object.keys(localStorage)
function removeMovie() {
    localStorage.removeItem(this.id)
    this.closest(".movie-container").remove()
    
}
function displayWatchlist() {
    if (allKeys.length > 0) {
        watchlist.innerHTML = ""
    }
    allKeys.forEach(key => {
        fetch(`https://www.omdbapi.com/?apikey=a505d3c&i=${key}`)
            .then(res => res.json())
            .then(data => {
                watchlist.innerHTML += `
                    <div class="flex movie-container">
                        <div class="flex movie-container-poster">
                            <img class="movie-poster" src=${data.Poster} alt="N/A"/>
                        </div>
                        <div class="movie-container-info">
                            <div class="flex">
                                <h2>${data.Title}</h2>
                                <p>⭐${data.imdbRating}</p>
                            </div>
                            <div class="flex">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <button class="watchlist-btn" id=${data.imdbID}>
                                    <img class="icon watchlist-icon" src="icons/remove.svg"/>
                                        Remove
                                </button>
                            </div>
                            <div class="flex">
                                <p>${data.Plot}</p>
                            </div>
                        </div>
                    </div>
                    `
            const movieButtons = document.querySelectorAll(".watchlist-btn")
            movieButtons.forEach(button => {
                button.addEventListener("click", removeMovie)
            })
            })
    })
}
displayWatchlist()
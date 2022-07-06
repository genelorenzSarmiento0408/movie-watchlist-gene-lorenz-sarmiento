const watchlist = localStorage.getItem("watchlist");
let movies = JSON.parse(watchlist);
const selections = document.getElementById("selections");
render(movies);

function render(watchlist) {
  if (!watchlist?.length) {
    return (selections.innerHTML = `
            <div>
                <p>Your watchlist is looking kinda empty...</p>
                <a href="./index.html">
                    <h3 class="watchlist">
                        <img src="plus-icon.png" /> Let's add some movies!
                    </h3>
                </a>
            </div>
        `);
  }

  selections.innerHTML = "";
  movies.forEach((movie) => {
    const { Title, Poster, imdbRating, Plot, Genre, Runtime } = movie;
    selections.innerHTML += `
            <div class="card">
                <div>
                    <img src="${Poster}" alt="poster of ${Title}" class="poster"/>
                </div>
                <div class="about">
                    <div class="title-rating">
                        <h3>${Title} <img src="star-icon.png" class="star"/></h3>
                        <p class="rating">${imdbRating}</p>
                    </div>
                    <div class="type-time-watchlist">
                        <p>${Runtime}.</p>
                        <p>${Genre}</p>
                        <p id="${Title}" class="watchlist">
                            <img src="minus-icon.png" />
                            Remove
                        </p>
                    </div>
                    <div class="description">
                        <div>
                        ${Plot}
                        </div>
                    </div>
                </div>
            </div>
        `;
    document.querySelectorAll(".watchlist").forEach((el) => {
      el.addEventListener("click", () => {
        movies = movies.filter((obj) => obj.Title !== el.id);
        const watchlistNotification = document.getElementById(
          "watchlist-notification"
        );
        watchlistNotification.style.display = "block";
        watchlistNotification.textContent = "Removed to watchlist";
        setTimeout(() => {
          watchlistNotification.style.display = "none";
        }, 1000);
        localStorage.setItem("watchlist", JSON.stringify(movies));
        render(movies);
      });
    });
  });
}

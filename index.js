const form = document.getElementById("form");
const search = document.getElementById("search");
const selections = document.getElementById("selections");
let watchlist = [];
const API_KEY = import.meta.env.VITE_API_KEY;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search.value}`
  );
  const data = await res.json();
  if (data.Response === "False") {
    const p = document.createElement("p");
    p.textContent =
      "Unable to find what you're looking for. Please try another search.";
    selections.innerHTML = "";
    return selections.appendChild(p);
  }
  const movies = data.Search;
  selections.innerHTML = "";
  await movies.map(async (movie) => {
    const { Title, Poster, imdbID } = movie;
    const imdbInfo = await fetchImdbInfo(imdbID);
    const { imdbRating, Plot, Genre, Runtime } = imdbInfo;

    selections.innerHTML += `
            <div class="card">
                <div>
                    <img src="${Poster}" alt="poster of ${Title}" class="poster"/>
                </div>
                <div class="about">
                    <div class="title-rating">
                        <h3>${Title} </h3>
                        <p class="rating"><img src="star-icon.png" class="star"/>${imdbRating}</p>
                    </div>
                    <div class="type-time-watchlist">
                        <p>${Runtime}.</p>
                        <p>${Genre}</p>
                        <div id="{\\Title\\: \\${Title}\\, \\Poster\\: \\${Poster}\\, \\imdbRating\\: \\${imdbRating}\\, \\Plot\\: \\${Plot}\\, \\Genre\\: \\${Genre}\\, \\Runtime\\: \\${Runtime}\\ }" class="watchlist">
                        <img src="plus-icon.png" />
                        Add to watchlist
                        </div>
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
        watchlist.push(JSON.parse(el.id.replace(/\\/gm, '"')));
        watchlist = [...new Set(watchlist)];
        const watchlistNotification = document.getElementById(
          "watchlist-notification"
        );
        watchlistNotification.style.display = "block";
        watchlistNotification.textContent = "Added to watchlist";
        setTimeout(() => {
          watchlistNotification.style.display = "none";
        }, 1000);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      });
    });
  });
});

async function fetchImdbInfo(imdbId) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbId}`
  );
  const data = await res.json();
  return await data;
}

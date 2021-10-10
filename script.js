// DOM Elements
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
const spinner = document.getElementById("spinner");
const resultContainer = document.getElementById("result-container");
const resultInfo = document.getElementById("result-info");

// Function to Search Books
const searchBooks = () => {
  resultContainer.innerHTML = "";
  resultInfo.style.display = "none";
  const searchTerm = searchInput.value;
  if (searchTerm.trim()) {
    spinner.style.display = "block";
    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        addResultsToDOM(data);
        searchInput.value = "";
      });
  } else {
    alert("Enter keyword to search!");
  }
};

// Function to Add Results to the DOM
const addResultsToDOM = (data) => {
  resultInfo.style.display = "block";
  spinner.style.display = "none";
  if (data.numFound === 0) {
    resultInfo.innerHTML = `<h4>There are no search results, Try another keyword!</h4>`;
  } else {
    resultInfo.innerHTML = `<h4>About ${data.numFound} Results</h4>`;
  }

  const resultsToShow = data.docs.slice(0, 30);

  resultsToShow.forEach((book) => {
    const div = document.createElement("div");
    const cover = book.cover_i
      ? `https://covers.openlibrary.org/w/id/${book.cover_i}-M.jpg`
      : "/default.jpg";
    const title = book.title;
    const author = book.author_name ? book.author_name[0] : "Unavailable";
    const publisher = book.publisher ? book.publisher[0] : "Unavailable";
    const firstPublished = book.first_publish_year
      ? book.first_publish_year
      : "Unavailable";
    div.classList.add("col-md-4");
    div.innerHTML = `
          <div class="card">
                    <div class="card-img">
                    <img
                      src=${cover} 
                      class="card-img-top" />
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text"><strong>Author</strong>: ${author}</p>
                      <p class="card-text"><strong>Publisher</strong>: ${publisher}</p>
                      <p class="card-text"><strong>First Published</strong>: ${firstPublished}</p>
                    </div>
          </div>
        `;
    resultContainer.appendChild(div);
  });
};

// Event Listeners
searchSubmit.addEventListener("click", searchBooks);

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const errorDiv = document.getElementById("error");
const bookHit = document.getElementById('bookHit');
const searchResult = document.getElementById("search-result");
//Search Books
const searchBook = () => {
    const searchText = searchInput.value;
    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    //clear
    searchInput.value = '';
    //clear Dom
    searchResult.innerHTML = '';
    bookHit.innerHTML = '';

    const url = ` http://openlibrary.org/search.json?q=${searchText} `;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data));
}

//Show All Result
const displaySearchResult = data => {
    if (data.numFound === 0) {
        errorDiv.innerText = 'No Result Found';
    }
    else {
        errorDiv.innerText = '';
    }
    const docs = data.docs;
    const numFound = data.numFound;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <h4 class="text-center">Total Book: ${numFound} </h4>
        `;

    docs.forEach((doc) => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
          <div class="d-flex justify-content-center">
            <img class=" w-50 h-50 p-2" src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card - img - top" alt="...">
           </div >
    <div class="card-body">
        <h3 class="card-title">Book Name: ${doc.title}</h3>
        <h6 class="card-title">Author Name: ${doc.author_name}</h6>
        <h6 class="card-title">First Publish Year: ${doc.first_publish_year ? doc.first_publish_year : ''}</h6>
    </div>
        </div >
    `;
        searchResult.appendChild(div);
    });
    bookHit.appendChild(div);
}

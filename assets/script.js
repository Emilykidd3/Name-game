var searchButton = document.querySelector("#search-button");
var nameInput = document.querySelector("#name-input");

function search() {
    let name = nameInput.value.trim();
    console.log(name)
}

searchButton.addEventListener("click", search);
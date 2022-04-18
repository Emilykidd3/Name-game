var searchButton = document.querySelector("#search-button");
var nameInput = document.querySelector("#name-input");

function search() {
    let name = nameInput.value.trim();
    fetch(`https://api.agify.io?name=${name}&country_id=US`)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayResults(data);
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}

function displayResults(data) {
    console.log(data)
}

searchButton.addEventListener("click", search);
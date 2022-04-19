const searchButton = document.querySelector("#search-button");
const nameInput = document.querySelector("#name-input");

function search() {
    let name = nameInput.value.trim();
    fetch(`https://api.agify.io?name=${name}&country_id=US`)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayResults(data, name);
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}

function displayResults(data, name) {
    const resultsDiv = document.querySelector("#results")
    resultsDiv.textContent = `The average age of some named ${name} is ${data.age}`;
    console.log(data.age)
}

searchButton.addEventListener("click", search);
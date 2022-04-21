const searchButton = document.querySelector("#search-button");
const nameInput = document.querySelector("#name-input");

function search() {
    findAge();
    findGender();
    findNationality();
}

function findAge() {
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

function findGender() {
    let name = nameInput.value.trim();
    fetch(`https://api.genderize.io?name=${name}&country_id=US`)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data, name);
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}

function findNationality() {
    let name = nameInput.value.trim();
    fetch(`https://api.nationalize.io?name=${name}`)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data, name);
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}

function displayResults(data, name) {
    const resultsDiv = document.querySelector("#results")
    if (data.age === null) {
        resultsDiv.textContent = `There are no results for someone named ${name}, try another name!`;
    } else {
        resultsDiv.textContent = `The predicted age of someone named ${name} is ${data.age}`;
    }
    console.log(data)
}

searchButton.addEventListener("click", search);
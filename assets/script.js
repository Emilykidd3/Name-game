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
                displayResults(data, name)
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
                console.log(data.gender);
                console.log(data.probability)
                displayGender(data, name);
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
                // console.log(data.country[0]);
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}

function displayResults(data, name) {
    const ageResults = document.querySelector("#age")
    const nameDisplay = document.querySelector("#name")
    nameDisplay.textContent = name;
    if (data.age === null) {
        ageResults.textContent = `There are no results for someone named ${name}, try another name!`;
    } else {
        ageResults.textContent = `The predicted age of someone named ${name} is ${data.age}`;
    }
}

function displayGender(data, name) {
    var genderResults = document.querySelector("#gender")
    var percentage = data.probability
    console.log(percentage.toString().split(".")[1]);
    if (data.gender === null) {
        genderResults.textContent = `There are no results for someone named ${name}, try another name!`;
    } else {
        genderResults.textContent = `${name} is a ${data.gender} name ${percentage.toString().split(".")[1]}% of the time`;
    }
}

searchButton.addEventListener("click", search);
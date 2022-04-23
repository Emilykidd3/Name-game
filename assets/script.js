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
    nameDisplay.textContent = capitalize(name);
    if (data.age === null) {
        ageResults.textContent = `There are no age results for someone named ${name}, try another name!`;
    } else {
        ageResults.textContent = `The predicted age of someone named ${name} is ${data.age}`;
    }
}

function displayGender(data, name) {
    var genderResults = document.querySelector("#gender")
    if (data.probability.toString().includes(".")) {
        console.log("contains .")
        var percentage = data.probability.toString().split(".")[1]
    } else {
        var percentage = 100
    }
    if (data.gender === null) {
        genderResults.textContent = `There are no gender results for someone named ${name}, try another name!`;
    } else {
        genderResults.textContent = `${name} is a ${data.gender} name ${percentage}% of the time`;
    }
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

searchButton.addEventListener("click", search);
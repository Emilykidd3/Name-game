const searchButton = document.querySelector("#search-button");
const nameInput = document.querySelector("#name-input");

const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );

function search() {
    if (nameInput.value.trim() === ""){
        const errorDisplay = document.querySelector("#no-input")
        errorDisplay.textContent = "type in a name to try!";
    } else {
        findAge();
        findGender();
        findNationality();
    }
}

function findAge() {
    let name = capitalize(nameInput.value.trim());
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
    let name = capitalize(nameInput.value.trim());
    fetch(`https://api.genderize.io?name=${name}&country_id=US`)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayGender(data, name);
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}

function findNationality() {
    let name = capitalize(nameInput.value.trim());
    fetch(`https://api.nationalize.io?name=${name}`)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayNationality(data, name)
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

function displayNationality(data, name) {
    // console.log(typeof(data.country[0].probability))
    // console.log(percentage)
    console.log(data.country)
    const nationalityResults = document.querySelector("#nationality")
    // console.log(data.country[0].country_id)
    if (data.country.length === 0) {
        console.log("here")
        nationalityResults.textContent = `There are no nationality results for someone named ${name}, try another name!`;
    } else {
        if (data.country[0].probability.toString().includes(".")) {
            var percentage = data.country[0].probability.toString().split(".")[1].slice(0,2)
        } else {
            var percentage = 100
        }
        var nationality = regionNames.of(data.country[0].country_id)
        nationalityResults.textContent = `The name ${name} is ${percentage}% likely to originate from ${nationality}`;
    }
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

searchButton.addEventListener("click", search);
document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchButton.click();
    }
  });
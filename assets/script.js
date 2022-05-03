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
        ageResults.textContent = `We can't find any results for someone named ${name}, try another name!`;
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
        genderResults.textContent = "";
    } else {
        genderResults.textContent = `${name} is a ${data.gender} name ${percentage}% of the time`;
    }
}

function displayNationality(data, name) {
    const nationalityResults = document.querySelector("#nationality")
    if (data.country.length === 0) {
        nationalityResults.textContent = "";
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
    name = name.charAt(0).toUpperCase() + name.slice(1);
    for (var i = 1; i < name.length; i++){
        name = name.slice(0,i) + name.charAt(i).toLowerCase() + name.slice(i+1)
    }
    return name;
}

searchButton.addEventListener("click", search);
document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchButton.click();
    }
  });
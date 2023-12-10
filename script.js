/////////////////////////////////////////    IMPORTS   //////////////////////////////////////////////////////// 


import setsData from "./setDatabase.json" assert { type: 'json' };;




/////////////////////////////////////////    FUNCTIONS  FOR GENERATING   ////////////////////////////////////////////////////////


function Player(array, boolean, num, name) { //function for creating a player 
    this.characters = array;
    this.first = boolean;
    this.map = num
    this.name = name
}



function shuffleArray(array) {  // shuffles array so that it has random order of characters
    let shuffledArray = []
    let seen = []
    let i = 0
    while (i < array.length) {
        let randomNum = Math.floor(Math.random() * array.length)
        if (!seen.includes(randomNum)) {
            shuffledArray.push(array[randomNum])
            seen.push(randomNum)
            i++
        }

    }

    return shuffledArray
}


function splitArray(array, x) {  // splits array into x arrays 
    let splittedArray = []
    let i = 0
    let n = Math.floor(array.length / x)
    while (i < x) {
        splittedArray.push(array.slice(0 + (i * n), n + (i * n)))
        i++

    }
    return splittedArray
}

function createPlayers(num, names) { // creates the same amount of players as numberOfPlayers
    let shuffledNames = shuffleArray(names)
    let players = []
    for (let i = 0; i < num; i++) {
        let newPlayer = new Player([], false, 0)
        newPlayer.name = shuffledNames[i]
        newPlayer.first = false
        players.push(newPlayer)
    }
    return players
}



function assignCharacters(players, characters, numberOfPlayers) {  //assigns characters to players

    for (let i = 0; i < numberOfPlayers; i++) {
        players[i].characters = characters[i]
    }

    return players
}




function whoIsFirst(array, maps) { // determines who goes first from the pair + assings  a map to each pair
    let shuffledMaps = shuffleArray(maps)
    let randomNum = Math.floor(Math.random() * 2)
    for (let i = 0; i < array.length; i++) {
        array[i][randomNum].first = true
        array[i][randomNum].map = shuffledMaps[i]
    }

    return array
}






function createPlayerUI(array, playersOutput, output) {
    let firstIndex = document.getElementById("first-checkbox").checked


    for (let i = 0; i < array.length; i++) { // creates one player div with images
        let player = document.createElement("div")
        player.classList.add(`player${i}`)

        let playerName = document.createElement("h2")
        playerName.classList.add("player-name")
        playerName.innerHTML = `${array[i].name}`
        if (firstIndex === true) {
            if (array[i].first === true) {
                playerName.classList.add("first")
            }
        }

        player.appendChild(playerName)

        let characterImagesDiv = document.createElement("div")
        characterImagesDiv.classList.add("character-images")

        for (let y = 0; y < array[i].characters.length; y++) { // creates characters images
            let characterImage = document.createElement("img")
            characterImage.setAttribute("src", `img/characters/${array[i].characters[y]}.jpg`)
            characterImagesDiv.appendChild(characterImage)
        }
        player.appendChild(characterImagesDiv)

        playersOutput.appendChild(player)


    }

    output.appendChild(playersOutput)


}



function createMapUI(array, playersOutput, output) {

    for (let i = 0; i < array.length; i++) {
        if (array[i].map === 0) {
        } else {

            let mapDiv = document.createElement("div")
            mapDiv.classList.add("map")

            let mapName = document.createElement("h2")
            mapName.textContent = transformString(array[i].map)

            mapDiv.appendChild(mapName)


            let mapImage = document.createElement("img")
            mapImage.setAttribute("src", `img/maps/${array[i].map}.jpg`)

            mapDiv.appendChild(mapImage)

            playersOutput.appendChild(mapDiv)
        }

    }



}


function generateOutput(playerPairs) { // generates UI for players
    let output = document.getElementById("output-div")
    output.innerHTML = ""


    for (let i = 0; i < playerPairs.length; i++) {

        let playersOutput = document.createElement("div")
        playersOutput.classList.add("players-output")

        createPlayerUI(playerPairs[i], playersOutput, output)

        createMapUI(playerPairs[i], playersOutput, output)

    }



}


function transformString(inputString) {
    const words = inputString.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const transformedString = capitalizedWords.join(' ');
    return transformedString;
}


/////////////////////////// EVENT LISTENERS ///////////////////////////
const tournamentCheckbox = document.getElementById("tournament")
let numberForEach = document.getElementById("characters-for-each")
const spreadCheckbox = document.getElementById("spread")

tournamentCheckbox.addEventListener("click", function () {
    let text = document.querySelector(".num-of-rounds-text")
    if (text.style.color === "black") {
        text.style.color = "grey"
    } else {
        text.style.color = "black"
    }
})

spreadCheckbox.addEventListener("click", function () {
    let text = document.querySelector(".char-for-each-text")
    if (text.style.color === "black") {
        text.style.color = "grey"
    } else {
        text.style.color = "black"
    }


    numberForEach.value = 0
})

numberForEach.addEventListener("click", function () {
    spreadCheckbox.checked = false
    const text = document.querySelector(".char-for-each-text")
    text.style.color = "black"
})



const generateButton = document.getElementById("generate-button").addEventListener("click", generate)

//////////////////////////////////////////    FUNCTIONS  FOR LIST    ////////////////////////////////////////////////////////


function removePlayer(event) {

    let listItem = event.target.parentNode;

    // Get the <ul> element that contains the list of players
    let listOfPlayers = listItem.parentNode;

    // Remove the <li> element from the <ul>
    listOfPlayers.removeChild(listItem);
}


function addPlayerFunction() {
    let list = document.getElementById("listOfPlayers")
    let playerInput = document.getElementById("playerToAdd")
    let playerName = playerInput.value.trim()
    if (playerName === "") {
        return false
    } else {
        let listItem = document.createElement("li")
        listItem.textContent = playerName


        let crossIcon = document.createElement("i");
        crossIcon.className = "fa-solid fa-xmark cross-icon";
        crossIcon.addEventListener('click', removePlayer);

        listItem.appendChild(crossIcon)

        list.appendChild(listItem)

        playerInput.value = " "
    }


}


let crossIcons = document.querySelectorAll('.cross-icon');
crossIcons.forEach(function (icon) {
    icon.addEventListener('click', removePlayer);
});





const addPlayerButton = document.getElementById("addPlayer").addEventListener("click", addPlayerFunction)

function makeArrayFromList() {
    let list = document.getElementById("listOfPlayers")
    let listItems = list.getElementsByTagName("li")
    let namesArray = []

    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent !== "") {
            namesArray.push(listItems[i].textContent)
        }

    }

    return namesArray

}


///////////////////////////////// TOURNAMENT MODE ///////////////////////////////////////////



function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function createPairings(players, numberOfRounds, characters, maps) {
    if (players % 2 != 0) {
        // errorMessage("Insert an even number of players");
    }

    const pairings = [];
    for (let round = 1; round <= numberOfRounds; round++) {
        let roundPairings = [];

        // Create a deep copy of the original players array for each round
        let playersCopy = deepCopy(players);

        // Assign characters to the copied players array
        playersCopy = assignCharacters(playersCopy, splitArray(shuffleArray(characters), players.length), players.length);

        for (let i = 0; i < playersCopy.length / 2; i++) {
            let pairing = [playersCopy[i], playersCopy[playersCopy.length - 1 - i]];
            roundPairings.push(pairing);
        }
        if (numberOfRounds > 1) {
            whoIsFirst(roundPairings, maps)
        }

        pairings.push(roundPairings);

        // Rotate players for the next round in the original array
        players = [players[0]].concat(players.slice(2), players[1]);
    }
    return pairings;
}




//////////////////////////////////////////    FUNCTIONS  FOR SET CHOICE   ////////////////////////////////////////////////////////


function chooseSets() {
    let charactersToUse = []

    for (let i = 0; i < setsData.sets.length; i++) {
        const setId = setsData.sets[i].id;
        const setCheckbox = document.getElementById(setId);

        if (setCheckbox && setCheckbox.checked) {
            charactersToUse = charactersToUse.concat(setsData.sets[i].characters);
        }
    }

    charactersToUse = shuffleArray(charactersToUse)
    return charactersToUse;

}



function chooseMaps() {
    let mapsToUse = []

    for (let i = 0; i < setsData.sets.length; i++) {
        const setId = setsData.sets[i].id;
        const setCheckbox = document.getElementById(setId);
        let n = Math.floor(Math.random() * (setsData.sets[i].maps.length))
        if (setCheckbox && setCheckbox.checked) {
            mapsToUse = mapsToUse.concat(setsData.sets[i].maps[n]);
        }
    }

    return mapsToUse

}

function shrinkArray(array, charactersForEachPlayer, numberOfPlayers) {
    let modifier = charactersForEachPlayer * numberOfPlayers
    array = array.slice(0, modifier + 1)
    return array
}

function errorMessage(text) {
    const output = document.getElementById("output-div")
    let message = document.createElement("h2")
    message.classList.add("error-msg")
    message.textContent = `${text}`
    output.appendChild(message)
}


///////////////////////////////////// GENERATE ///////////////////  


function generate(characters, maps, names) {
    let textDiv = document.getElementById("tournament-text")
    let buttonOutput = document.getElementById("tournament-buttons")
    const output = document.getElementById("output-div")
    textDiv.classList.add("hidden")
    buttonOutput.classList.add("hidden")

    buttonOutput.innerHTML = ""

    maps = chooseMaps()

    names = makeArrayFromList()

    let numberOfPlayers = names.length

    if (numberOfPlayers % 2 === 1 || numberOfPlayers === 0) {
        output.innerHTML = ""
        errorMessage("Insert an even number of players")
        setTimeout(function () {
            let whereToScroll = document.querySelector(".error-msg");
            whereToScroll.scrollIntoView({ behavior: "smooth" });
        }, 100);


    } else {

        let players = []


        players = createPlayers(numberOfPlayers, names)

        let characterPool = []


        if (document.getElementById("spread").checked === true) {
            characterPool = chooseSets()
            characters = characterPool
        } else {
            numberForEach = document.getElementById("characters-for-each")
            characterPool = chooseSets().slice(0, numberForEach.value * numberOfPlayers)
            characters = shrinkArray(characterPool, numberForEach.value, numberOfPlayers)
            characters = shuffleArray(characters)
            console.log(characters)
            if (characterPool.length < numberForEach.value * numberOfPlayers) {
                output.innerHTML = ""
                errorMessage("Not enough characters available")
                setTimeout(function () {
                    let whereToScroll = document.querySelector(".error-msg");
                    whereToScroll.scrollIntoView({ behavior: "smooth" });
                }, 100);

            }

        }
        console.log(characters)


        assignCharacters(players, splitArray(shuffleArray(characters), numberOfPlayers), numberOfPlayers)


        if (tournamentCheckbox.checked === true) {
            textDiv.innerHTML = ""
            buttonOutput.classList.remove("hidden")
            let numberOfRounds = document.getElementById("number-of-rounds").value
            let output = document.getElementById("output-div")
            let pairs = createPairings(players, numberOfRounds, characters, maps)
            if (numberOfRounds > numberOfPlayers - 1) {
                output.innerHTML = ""
                buttonOutput.innerHTML = ""
                errorMessage("Not enough players for the number of rounds")

            } else {

                output.innerHTML = ""
                buttonOutput.innerHTML = ""
                for (let i = 0; i < numberOfRounds; i++) {
                    maps = chooseMaps()
                    let roundButton = document.createElement("button")
                    roundButton.classList.add("round-button")
                    roundButton.innerText = `Round ${i + 1}`

                    roundButton.addEventListener("click", function () {
                        textDiv.classList.remove("hidden")
                        textDiv.innerHTML = ""
                        let roundText = document.createElement("h2")
                        roundText.classList.add("round-text")
                        roundText.innerText = `Round ${i + 1}`
                        textDiv.appendChild(roundText)
                        generateOutput(pairs[i])
                        setTimeout(function () {
                            let whereToScroll = document.querySelector(".map");
                            whereToScroll.scrollIntoView({ behavior: "smooth" });
                        }, 100)
                    })
                    buttonOutput.appendChild(roundButton)
                }
                setTimeout(function () {
                    let whereToScroll = document.querySelector("#tournament-buttons");
                    whereToScroll.scrollIntoView({ behavior: "smooth" });
                }, 100)
            }
        } else {
            textDiv.innerHTML = ""

            let pairs = createPairings(players, 1, characterPool)

            whoIsFirst(pairs[0], maps)

            generateOutput(pairs[0])
            setTimeout(function () {
                let whereToScroll = document.querySelector(".map")
                whereToScroll.scrollIntoView({ behavior: "smooth" })
            }, 100)
        }


    }

}



console.log(setsData.sets[0].maps[0].name)






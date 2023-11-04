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


    for (let i = 0; i < array.length; i++) { // creates one player div with images
        let player = document.createElement("div")
        player.classList.add(`player${i}`)

        let playerName = document.createElement("h2")
        playerName.classList.add("player-name")
        playerName.innerHTML = `${array[i].name}`

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
const numberForEach = document.getElementById("characters-for-each")
const spreadCheckbox = document.getElementById("spread")

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
    let playerName = playerInput.value
    if (playerName == " ") {
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

    return charactersToUse;

}

function chooseMaps() {
    let mapsToUse = []

    for (let i = 0; i < setsData.sets.length; i++) {
        const setId = setsData.sets[i].id;
        const setCheckbox = document.getElementById(setId);

        if (setCheckbox && setCheckbox.checked) {
            mapsToUse = mapsToUse.concat(setsData.sets[i].maps);
        }
    }

    return mapsToUse

}

function shrinkArray(array, charactersForEachPlayer, numberOfPlayers) {
    let modifier = charactersForEachPlayer * numberOfPlayers
    array = array.slice(0, modifier + 1)
    return array
}

function errorMessage() {
    const output = document.getElementById("output-div")
    let message = document.createElement("h2")
    message.classList.add("error-msg")
    message.textContent = "Insert an even number of players"
    output.appendChild(message)
}


///////////////////////////////////// GENERATE ///////////////////  


function generate(characters, maps, names) {


    maps = chooseMaps()

    names = makeArrayFromList()
    let firstIndex = document.getElementById("first-checkbox").checked
    let numberOfPlayers = names.length

    if (numberOfPlayers % 2 === 1) {
        const output = document.getElementById("output-div")
        output.innerHTML = ""
        errorMessage()
        setTimeout(function () {
            let whereToScroll = document.querySelector(".error-msg");
            whereToScroll.scrollIntoView({ behavior: "smooth" });
        }, 100);


    } else {

        let players = []


        players = createPlayers(numberOfPlayers, names)

        let characterPool = chooseSets()



        if (document.getElementById("spread").checked === true) {
            characters = chooseSets()
        } else {
            let charactersForEachPlayer = document.getElementById("characters-for-each").value
            characters = shrinkArray(shuffleArray(characterPool), charactersForEachPlayer, numberOfPlayers)
            console.log(characters)
            if (characterPool.length < charactersForEachPlayer * numberOfPlayers) {
                console.log("not enough characters")
                return

            }
        }


        assignCharacters(players, splitArray(shuffleArray(characters), numberOfPlayers), numberOfPlayers)

        let playersToSplit = splitArray(players, players.length / 2)

        if (firstIndex === true) {
            whoIsFirst(playersToSplit, maps)
        }

        generateOutput(playersToSplit)

        console.log(characters)

        setTimeout(function () {
            let whereToScroll = document.querySelector(".map");
            whereToScroll.scrollIntoView({ behavior: "smooth" });
        }, 100);

    }



}



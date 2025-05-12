'use strict';
import {words} from "./english.js"

const hangmanImg = document.getElementById("hangmanImg");
const searchedWordContainer = document.getElementById("searchedWord");
const gameResult = document.getElementById("gameResult");
const enteredLetters = [];
const buttonNewGame = document.getElementById("newGame");
const buttons = document.querySelectorAll(".abc button"); 

let searchedWord = words[Math.floor(Math.random()*1000)];
let searchedWordArray = searchedWord.toUpperCase().split("");
let foundLettersArray = searchedWordArray.slice().fill("_");
draw(foundLettersArray);

const hangmanStages = ['hm0', 'hm1','hm2','hm3','hm4','hm5', 'hm6', 'hm7'];
let currentStageIndex = 0;

buttonNewGame.addEventListener("click", () => {
    restart();
})

document.addEventListener('keydown', function(event) {
    const pressedKey = event.key.toUpperCase(); 
    if (/^[A-Z]$/.test(pressedKey)) {  
        checkLetterInput(pressedKey);  
    }
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        checkLetterInput(button.textContent, button);
        button.disabled = true;
    })
})

function checkLetterInput(pressedkey, button) {
    let result = enteredLetters.includes(pressedkey);
    if (!result) {
        enteredLetters.push(pressedkey);
        if (!button) {
            const analogButton = Array.from(buttons).find(button => button.textContent === pressedkey);
            searchLetter(pressedkey, analogButton);
            if (analogButton) {
                analogButton.disabled = true;
            }
        }
        else {
        searchLetter(pressedkey, button);}
    }
}

function draw(foundLettersArray) {
    searchedWordContainer.textContent = foundLettersArray.join(" ");
}

function searchLetter(pressedKey, button) {
    let counter = 0;
    searchedWordArray.forEach((letter, index) =>  {
        if (letter === pressedKey) {
            foundLettersArray[index] = letter;
            counter++;
            button.classList.add("correct");
        }
    })

    if (counter === 0) {
        currentStageIndex++;   
        button.classList.add("wrong");
        hangmanImg.src = `./img/${hangmanStages[currentStageIndex]}.png`;
        if (currentStageIndex === 7) {
            buttons.forEach ( button => button.disabled = true);
            gameResult.innerHTML = `Game Over. <br> Secret word: <span class="secretWordWas"> ${searchedWord} </span>`;
            buttonNewGame.classList.add("show");
        }
    }
    else {
        draw(foundLettersArray);
        checkWin(foundLettersArray);
    }
}

function checkWin(foundLettersArray) {
    let controlle = foundLettersArray.some(num => num === "_");
    if (controlle === false) {
        buttons.forEach ( button => button.disabled = true);
        gameResult.textContent = "You win!";
        buttonNewGame.classList.add("show");
    }
}

function restart() {
    console.log("---------------------------------------")
    console.log("RESTART")
    searchedWord = words[Math.floor(Math.random()*1000)];
    searchedWordArray = searchedWord.toUpperCase().split("");
    foundLettersArray = searchedWordArray.slice().fill("_");
    enteredLetters.length = 0;
    currentStageIndex = 0;
    hangmanImg.src = `./img/${hangmanStages[currentStageIndex]}.png`;
    gameResult.textContent = '';
    draw(foundLettersArray) ;
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove("wrong");
        button.classList.remove("correct");
    });
    buttonNewGame.classList.remove("show");
}
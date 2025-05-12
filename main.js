'use strict';
import {words} from "./deutsch.js"

const hangmanImg = document.getElementById("hangmanImg"); // тут фото висельника
const searchedWordContainer = document.getElementById("searchedWord"); //  здесь слово зашифрованное покажут
const gameResult = document.getElementById("gameResult"); //  вывод результата игры
const enteredLetters = []; // сюда вводятся уже ранее нажатые клавиши 
const buttonNewGame = document.getElementById("newGame")
const buttons = document.querySelectorAll(".abc button"); 

let searchedWord = words[Math.floor(Math.random()*40099)]; // сгенерированное по индексу массива  слово
console.log("generiertes searchedWord = ", searchedWord ) 
let searchedWordArray = searchedWord.toUpperCase().split(""); // превращаем слово в массив букв
console.log(searchedWordArray)
let foundLettersArray = searchedWordArray.slice().fill("_"); // то что мы ввели, наш текущий угаданный массив букв
console.log(foundLettersArray)
draw(foundLettersArray)  // рисуем игру

const hangmanStages = ['hm0.jpg', 'hm1.jpg','hm2.jpg','hm3.jpg','hm4.jpg','hm5.jpg', 'hm6.jpg', 'hm7.jpg'];
let currentStageIndex = 0;

buttonNewGame.addEventListener("click", () => {
    restart()
})

document.addEventListener('keydown', function(event) { // нажатие на клавишу
    const pressedKey = event.key.toUpperCase();   // клавиша принята, сведена к верхнему регистру
    if (/^[A-Z]$/.test(pressedKey)) {   // если латиница
        console.log('Gedrückte pressedKey:', pressedKey);
        checkLetterInput(pressedKey);  // запуск функции проверки нажатой клавиши
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
            const analogButton = Array.from(buttons).find(button => button.textContent === pressedkey)
            searchLetter(pressedkey, analogButton);
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
        console.log(button);
        button.classList.add("wrong");
        hangmanImg.src = `./img/${hangmanStages[currentStageIndex]}`
        if (currentStageIndex === 7) {
            gameResult.innerHTML = `Game Over. <br> You didn't guess the word <span class="secretWordWas"> ${searchedWord} </span>`;
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
        gameResult.textContent = "You win!";
        buttonNewGame.classList.add("show");
    }
}

function restart() {
    console.log("---------------------------------------")
    console.log("RESTART")
    searchedWord = words[Math.floor(Math.random()*91100)];
    searchedWordArray = searchedWord.toUpperCase().split("");
    foundLettersArray = searchedWordArray.slice().fill("_");
    enteredLetters.length = 0;
    currentStageIndex = 0;
    hangmanImg.src = `./img/${hangmanStages[currentStageIndex]}`;
    gameResult.textContent = '';
    draw(foundLettersArray) ;
    buttons.forEach(button => {
        button.disabled = false
        button.classList.remove("wrong");
        button.classList.remove("correct");
    });
    buttonNewGame.classList.remove("show");
}
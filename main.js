'use strict';
import {worte} from "./worte.js"

const hangmanImg = document.getElementById("hangmanImg"); // тут фото висельника
const searchedWordContainer = document.getElementById("searchedWord"); //  здесь слово зашифрованное покажут
const gameResult = document.getElementById("gameResult"); //  вывод результата игры
const letters = document.getElementById("letters"); // тут выводятся введенные уже буквы. потмо можно удалить
const lettersArray = []; // сюда вводятся уже ранее нажатые клавиши 
const buttons = document.querySelectorAll("button"); // кнопки с буквами. в первую очередь важны для смарта
const abc = document.querySelector(".abc"); // НЕ ИСПОЛЬЗУЕТСЯЯ

let searchedWord = worte[Math.floor(Math.random()*91100)]; // сгенерированное по индексу массива  слово
console.log("generiertes searchedWord = ", searchedWord ) 
let searchedWordArray = searchedWord.toUpperCase().split(""); // превращаем слово в массив букв
console.log(searchedWordArray)
let foundLettersArray = searchedWordArray.slice().fill("_"); // то что мы ввели, наш текущий угаданный массив букв
console.log(foundLettersArray)
draw(foundLettersArray)  // рисуем игру

const hangmanStages = ['hm0.jpg', 'hm1.jpg','hm2.jpg','hm3.jpg','hm4.jpg','hm5.jpg', 'hm6.jpg', 'hm7.jpg'];
let currentStageIndex = 0;

document.addEventListener('keydown', function(event) { // нажатие на клавишу
    const pressedKey = event.key.toUpperCase();   // клавиша принята, сведена к верхнему регистру
    if (/^[A-Z]$/.test(pressedKey)) {   // если латиница
        console.log('Gedrückte pressedKey:', pressedKey);
        letterInputCheck(pressedKey);  // запуск функции проверки нажатой клавиши
    }
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        letterInputCheck(button.textContent, button);
        button.disabled = true;
    })
})

function letterInputCheck(pressedkey, button) {
 
    let result = lettersArray.includes(pressedkey);
    if (!result) {
        lettersArray.push(pressedkey);
        if (!button) {
            // ЗДЕСЬ ПОТОМ ПЕРЕДЕЛАТЬ НА ВОЗМОЖНО FIND()
            buttons.forEach(button  => {
                if (button.textContent === pressedkey) {
                    console.log("XXXXXX")
                    searchLetter(pressedkey, button);
                }
            })
        }
        else {
        searchLetter(pressedkey, button);}
    }
    letters.textContent = lettersArray.sort((a, b) => a.localeCompare(b)).join(" ");
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
            gameResult.textContent = `Game Over. searchedWord war ${searchedWord}`;
            setTimeout(restart, 3000);
        }
    }
    else {
        draw(foundLettersArray);
        wincontrolle(foundLettersArray);
    }
}

function wincontrolle(foundLettersArray) {
    let controlle = foundLettersArray.some(num => num === "_");
    if (controlle === false) {
        gameResult.textContent = "You win";
        setTimeout(restart, 3000);
    }
}



function restart() {
    console.log("---------------------------------------")
    console.log("RESTART")
    searchedWord = worte[Math.floor(Math.random()*91100)];
    searchedWordArray = searchedWord.toUpperCase().split("");
    foundLettersArray = searchedWordArray.slice().fill("_");
    letters.textContent = '';
    lettersArray.length = 0;
    currentStageIndex = 0;
    hangmanImg.src = `./img/${hangmanStages[currentStageIndex]}`;
    gameResult.textContent = '';
    draw(foundLettersArray) ;
    buttons.forEach(button => {
        button.disabled = false
        button.classList.remove("wrong");
        button.classList.remove("correct");
    });
}
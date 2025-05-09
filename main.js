'use strict';
import {worte} from "./worte.js"

const hangmanImg = document.getElementById("hangmanImg");
const suchwortContainer = document.getElementById("suchwort");
const result = document.getElementById("result");
const buchs = document.getElementById("buchs");
const buchsArray = [];

let suchwort = worte[Math.floor(Math.random()*91100)];
console.log("generiertes suchwort = " +suchwort )
let suchwortArray = suchwort.toUpperCase().split("");
console.log(suchwortArray)
let versuchArray = suchwortArray.slice().fill("_");
console.log(versuchArray)
console.log("---------------------------------------")
draw(versuchArray) 

const fehlerImgArray = ['hm0.jpg', 'hm1.jpg','hm2.jpg','hm3.jpg','hm4.jpg','hm5.jpg', 'hm6.jpg', 'hm7.jpg'];
let fehlerIndex = 0;

function restart() {
    console.log("RESTART")
    suchwort = worte[Math.floor(Math.random()*91100)];
    suchwortArray = suchwort.toUpperCase().split("");
    versuchArray = suchwortArray.slice().fill("_");
     buchs.textContent = '';
    fehlerIndex = 0;
    console.log(`${fehlerImgArray[fehlerIndex]}`)
    hangmanImg.src = `./img/${fehlerImgArray[fehlerIndex]}`;
    result.textContent = '';
    console.log("generiertes suchwort = " +suchwort )
    console.log(suchwortArray)
    console.log(versuchArray)
    draw(versuchArray) ;
}

document.addEventListener('keydown', function(event) {
    const taste = event.key.toUpperCase();  
    if (/^[A-Z]$/.test(taste)) { 
        console.log('Gedrückte Taste:', taste);
        enteredBuchs(taste);
    }
});

function draw(versuchArray) {
    suchwortContainer.textContent = versuchArray.join(" ");
}

function suchenBuch(taste) {
    console.log("hallo from suchenbuch")
    let counter = 0;
    suchwortArray.forEach((buch, index) =>  {
        console.log("проверяем букву " +buch)
        if (buch === taste) {
            versuchArray[index] = buch;
            counter++
            console.log("EST")
        }
    })
    if (counter === 0) {
        console.log("NET")
        fehlerIndex++;    
        console.log("количество ошибок уже" +fehlerIndex);    
        hangmanImg.src = `./img/${fehlerImgArray[fehlerIndex]}`
        if (fehlerIndex === 7) {
            result.textContent = "Game Over";
            setTimeout(restart, 3000);
        }
    }
    else {
        draw(versuchArray);
        wincontrolle(versuchArray);
    }
}

function wincontrolle(versuchArray) {
    console.log("hallo from wincontrolle")
    let controlle = versuchArray.some(num => num === "_");
    console.log(controlle)
    if (controlle === false) {
        result.textContent = "ИГРА ОКОНЧЕНА. ТЫ ВЫИГРАЛ";
        setTimeout(restart, 3000);
    }
}

function enteredBuchs(taste) {
        let result = buchsArray.includes(taste);
        if (!result) {
            buchsArray.push(taste)
            suchenBuch(taste);

        }
        buchs.textContent = buchsArray.sort((a, b) => a.localeCompare(b)).join(" ");
}
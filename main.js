'use strict';
import {worte} from "./worte.js"

const hangmanImg = document.getElementById("hangmanImg");
const suchwortContainer = document.getElementById("suchwort");
const result = document.getElementById("result");

const suchwort = worte[Math.floor(Math.random()*91100)];
console.log("generiertes suchwort = " +suchwort )
const suchwortArray = suchwort.toLowerCase().split("");
console.log(suchwortArray)
const versuchArray = suchwortArray.slice().fill("_");
console.log(versuchArray)
console.log("---------------------------------------")
draw(versuchArray) 

const fehlerImgArray = ['hm0.jpg', 'hm1.jpg','hm2.jpg','hm3.jpg','hm4.jpg','hm5.jpg', 'hm6.jpg', 'hm7.jpg'];
let fehlerIndex = 0;

document.addEventListener('keydown', function(event) {
    const taste = event.key.toLowerCase();  
    if (/^[a-z]$/.test(taste)) { 
        console.log('Gedrückte Taste:', taste);
        suchenBuch(taste);
    }
});

function draw(versuchArray) {
    suchwortContainer.textContent = versuchArray.join(" ");
}

function suchenBuch(taste) {
    let counter = 0;
    suchwortArray.forEach((buch, index) =>  {
        if (buch === taste) {
            versuchArray[index] = buch;
            counter++
        }
    })
    if (counter === 0) {
        fehlerIndex++;
        if (fehlerIndex >= 7) {
            result.textContent = "Game Over";
        }
        hangmanImg.src = `./img/${fehlerImgArray[fehlerIndex]}`
    }
    else {
                    draw(versuchArray);
            wincontrolle(versuchArray)
    }
}

function wincontrolle(versuchArray) {
    let controlle = versuchArray.some(num => num === "_");
    console.log(controlle)
    if (controlle === false) {
        result.textContent = "ИГРА ОКОНЧЕНА. ТЫ ВЫИГРАЛ";
    }
}
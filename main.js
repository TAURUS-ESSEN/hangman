'use strict';
import {worte} from "./worte.js"

const hangmanImg = document.getElementById("hangmanImg");
const suchwortContainer = document.getElementById("suchwort");
const result = document.getElementById("result");
const buchs = document.getElementById("buchs");
const buchsArray = [];
const buttons = document.querySelectorAll("button");
const abc = document.querySelector(".abc");

let suchwort = worte[Math.floor(Math.random()*91100)];
console.log("generiertes suchwort = ", suchwort )
let suchwortArray = suchwort.toUpperCase().split("");
console.log(suchwortArray)
let versuchArray = suchwortArray.slice().fill("_");
console.log(versuchArray)
draw(versuchArray) 

const fehlerImgArray = ['hm0.jpg', 'hm1.jpg','hm2.jpg','hm3.jpg','hm4.jpg','hm5.jpg', 'hm6.jpg', 'hm7.jpg'];
let fehlerIndex = 0;

document.addEventListener('keydown', function(event) {
    const taste = event.key.toUpperCase();  
    if (/^[A-Z]$/.test(taste)) { 
        console.log('Gedrückte Taste:', taste);
        enteredBuchsControlle(taste);
    }
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        enteredBuchsControlle(button.textContent, button);
        button.disabled = true;
    })
})


function draw(versuchArray) {
    suchwortContainer.textContent = versuchArray.join(" ");
}

function suchenBuch(taste, button) {
    let counter = 0;
    suchwortArray.forEach((buch, index) =>  {
        if (buch === taste) {
            versuchArray[index] = buch;
            counter++
        }
    })
    if (counter === 0) {
        fehlerIndex++;   
        console.log(button)
        button.classList.add("falsch");
        hangmanImg.src = `./img/${fehlerImgArray[fehlerIndex]}`
        if (fehlerIndex === 7) {
            result.textContent = `Game Over. Suchwort war ${suchwort}`;
            setTimeout(restart, 3000);
        }
    }
    else {
        draw(versuchArray);
        wincontrolle(versuchArray);
    }
}

function wincontrolle(versuchArray) {
    let controlle = versuchArray.some(num => num === "_");
    if (controlle === false) {
        result.textContent = "Du hast gewonnen";
        setTimeout(restart, 3000);
    }
}

function enteredBuchsControlle(tasteValue, taste) {
    let result = buchsArray.includes(tasteValue);
    if (!result) {
        buchsArray.push(tasteValue);
        suchenBuch(tasteValue, taste);
    }
    buchs.textContent = buchsArray.sort((a, b) => a.localeCompare(b)).join(" ");
}

function restart() {
    console.log("---------------------------------------")
    console.log("RESTART")
    suchwort = worte[Math.floor(Math.random()*91100)];
    suchwortArray = suchwort.toUpperCase().split("");
    versuchArray = suchwortArray.slice().fill("_");
    buchs.textContent = '';
    buchsArray.length = 0;
    fehlerIndex = 0;
    hangmanImg.src = `./img/${fehlerImgArray[fehlerIndex]}`;
    result.textContent = '';
    draw(versuchArray) ;
    buttons.forEach(button => {
        button.disabled = false
        button.classList.remove("falsch");
    });
}
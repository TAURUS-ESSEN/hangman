'use strict';
import {worte} from "./worte.js"

const imgContainer = document.getElementById("imgContainer");
const hangmanImg = document.getElementById("hangmanImg");
const suchwortContainer = document.getElementById("suchwort");
const result = document.getElementById("result");

const suchwort = worte[Math.floor(Math.random()*91100)];
console.log("придуманный suchwort = " +suchwort )
const suchwortArray = suchwort.toLowerCase().split("");
console.log(suchwortArray)
const versuchArray = suchwortArray.slice().map(value => value = "_");
console.log(versuchArray)
console.log("---------------------------------------")
draw(versuchArray) //запускаем отрисовку первую

const fehlerImgArray = ['hm0.jpg', 'hm1.jpg','hm2.jpg','hm3.jpg','hm4.jpg','hm5.jpg', 'hm6.jpg', 'hm7.jpg'];
let fehlerIndex = 0;

document.addEventListener('keydown', function(event) {
    const taste = event.key.toLowerCase();  
    if (/^[a-z]$/.test(taste)) { // проверяем, что это именно одна латинская буква
        console.log('Gedrückte Taste:', taste);
        suchenBuch(taste);
    }
});

function draw(versuchArray) {
    console.log("привет из функции рисования ");
    suchwortContainer.textContent = versuchArray.join(" ");
}

function suchenBuch(taste) {
    console.log("привет из функции поиска буквы " + taste);
    console.log(suchwortArray)
    let counter = 0;
    suchwortArray.forEach((buch, index) =>  {
        console.log(`Сравниваем букву ${taste} из массива: с буквой ${buch}`)
        if (buch === taste) {
            console.log("чото нашел")
            console.log("ee index = ", index)
            versuchArray[index] = buch;
            console.log("мой массив теперь такой " +versuchArray);
            draw(versuchArray);
            counter++
        }
    })
    if (counter === 0) {
       console.log( "ничего не нашел за весь поиск");
       fehlerIndex++;
       if (fehlerIndex >= 7) {
        console.log("gameOver")
        result.textContent = "Game Over";
       }
       hangmanImg.src = `./img/${fehlerImgArray[fehlerIndex]}`

    }
}


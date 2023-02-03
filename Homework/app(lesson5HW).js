// Собираем необходимые элементы в переменные

const screens = document.querySelectorAll('.screen')
const timeNearBoard = document.querySelector('.time')
const startBut = document.querySelector('.startBut')
const board = document.querySelector('.board')
const selectTimeUl = document.querySelector('ul')

// Задаем необходимые переменные

let countHit = 0
let countMiss = 0
let indexScreens = 0
let selectedTime = 1
let assessment = [`Ты даже не вспотел...`, `Мышка не загорелась?`, `У тебя руки не болят после такого?`, `Что ты вообще такое?`]

// Задаем функции 

function swapScreen (){
    screens[indexScreens].classList.add('swap')
    indexScreens++
}

function startGame (){
    setInterval(()=>{
        if(selectedTime != 0 & selectedTime >= 10) {
            timeNearBoard.innerHTML = `00:${selectedTime--}`
        }
        else if(selectedTime < 10 & selectedTime > 0)
        {   
            timeNearBoard.innerHTML = `00:0${selectedTime--}`
        }
        else {
            clearInterval()
            timeNearBoard.innerHTML = `00:00`
        }
    }, 1000)
    createRandomCircle()
}

function createRandomCircle (){
    // Рандомный размер
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const randomSizeCircle = randomNumberBetween(45, 15)
    circle.style.width = `${randomSizeCircle}px`
    circle.style.height = `${randomSizeCircle}px`
    // Рандомный цвет
    const randomColor = `rgb(${randomNumberBetween(255, 0)}, ${randomNumberBetween(255, 0)}, ${randomNumberBetween(255, 0)})`
    circle.style.backgroundColor = randomColor
    circle.style.boxShadow = `0px 0px 9px ${randomColor}`
    // Рандомное расположение
    const {width, height} = board.getBoundingClientRect()
    const coordianX = randomNumberBetween(width - randomSizeCircle, 0 + randomSizeCircle)
    const coordianY = randomNumberBetween(height - randomSizeCircle, 0 + randomSizeCircle)
    circle.style.top = `${coordianY}px`
    circle.style.left = `${coordianX}px`
    board.append(circle)
}

function randomNumberBetween (max, min){
    const randomNumber = Math.round(Math.random()*(max - min) + min)
    return randomNumber
}

function finishGame (){
    timeNearBoard.parentNode.classList.add('hide')
    timeNearBoard.classList.add('hide')
    board.innerHTML = `<h4>${assessment[randomNumberBetween(assessment.length - 1, 0)]} Ты набрал ${countHit} очка(ов) и промахнулся всего ${countMiss} раз(а)</h4>`
}

// Слушатели

// Слушатель для кнопки старт
startBut.addEventListener('click', swapScreen)

// Слушатель для кнопок выбора и назначения времени
selectTimeUl.addEventListener('click', (event)=>{
    if(event.target.classList.contains('timeBut')){
        // Выбрали время
        selectedTime = parseInt(event.target.getAttribute('data-time'))
        swapScreen()
        // Назначили время
        timeNearBoard.innerHTML = `00:${selectedTime}`
        startGame()
    }
})
// Слушатель для попадания/промаха по кругу + проверка осталось ли время на игру
board.addEventListener('click',(event)=>{
    
    if(event.target.classList.contains('circle')){
        if(timeNearBoard.innerHTML != '00:00'){
            countHit++
            event.target.remove()
            createRandomCircle()
        }
        else {
            finishGame()
        }
    }
    else{
        if(timeNearBoard.innerHTML != '00:00'){
            countMiss++
        }
        else {
            finishGame()
        }
    }
})
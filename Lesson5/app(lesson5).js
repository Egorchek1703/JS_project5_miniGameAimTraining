                                        // Создаю слушатель на перелистывание 1го скрина

const startBut = document.querySelector('.start')
startBut.addEventListener('click', swapScreen)

function swapScreen (event){
    event.preventDefault() // отменяем поведение по умолчанию у ссылки которая добавялет к адресной строке "#"
    
    const screens = document.querySelectorAll('.screen')
    screens[0].classList.add('up')
}

                                        // Создаю слушатель для выбора времени

const ulToSelectTime = document.querySelector('.time-list')
let selectedTime = 0

ulToSelectTime.addEventListener('click', (event)=>{
    // Т.к. слушатель добавлен для списка, то пространство между кнопками тоже кликабельно и при нажатии возвращается сам список а не кнопки его элементов
    if (event.target.classList.contains('time-btn')){
        // console.log(event.target) // КО только кнопки и при нажатии на пространство между ними не будет выводить сам список
        // console.log(event.target.getAttribute('data-time')) // КО 10, 20 или 30 в зависимости от нажатой кнопки
        selectedTime = parseInt(event.target.getAttribute('data-time'))
        startGame(selectedTime)
    }
})

                                        // Создаю функцию старта игры

let timeNearBoard = document.querySelector('#time')

function startGame(time){
    const screens = document.querySelectorAll('.screen')
    screens[1].classList.add('up')

    timeNearBoard.innerHTML = `00:${time}`

    setInterval(() => {
        if(time >= 10){
            timeNearBoard.innerHTML = `00:${time--}`
        }
        else if(time < 10 & time > 0){
            timeNearBoard.innerHTML = `00:0${time--}`
        }
        else{
            timeNearBoard.innerHTML = `00:00`
            clearInterval()
        }
    }, 1000);
    createRandomCircle()
}

                                        // Создаю функцию появления рандомных кружков и подсчета попаданий

const board = document.querySelector('.board')

let countShot = 0
let countMiss = 0

function createRandomCircle (){
    const circle = document.createElement('div')
    // Рандомный размер круга
    let randomCircleSize = getRandomNumber(45, 15) // возвращает число, которое ниже задаем в качестве ширины и высоты круга
    circle.style.width = `${randomCircleSize}px`
    circle.style.height = `${randomCircleSize}px`
    circle.classList.add('circle')
    // Рандомное положение круга
    // board.getBoundingClientRect() // возвращает объект в котором в качестве свойств представлены коордианаты элемента DOM и его размеры
    const {width, height} = board.getBoundingClientRect() // с помощью деструктуризации получаем из этих данных только ширину и высоту
    const coordiansX = getRandomNumber(width - randomCircleSize, 0 + randomCircleSize)
    const coordiansY = getRandomNumber(height - randomCircleSize, 0 + randomCircleSize)
    circle.style.left = `${coordiansX}px`
    circle.style.top = `${coordiansY}px`
    board.append(circle)    
}

                                        // Слушатель при клике считающий попадания, скрывающий круг и следом добавляющий новый, а также считающий промахи

board.addEventListener('click', (event)=>{
    if (event.target.classList.contains('circle')) {
        if (timeNearBoard.innerHTML != `00:00`){            
            countShot++
            event.target.remove()
            createRandomCircle()
        }
        else {
            const finalHeading = document.querySelector('h3')
            finalHeading.innerHTML = `Время вышло! Ваш счет: ${countShot} очков. Вы промахнулись ${countMiss} раз(а). Для повторной игры перезагрузите страницу`
            
            const assessment = ['Ты настоящий снайпер', 'Вы случаем не профессиональный игрок?', 'Где ты так научился?', 'Ну и жесть... Мышка не загорелась?', 'Еще чуть-чуть и ты бы пробил курсором дисплей!!!']
            board.innerHTML = `<h2>${assessment[Math.round(Math.random()*(assessment.length - 1))]}</h2>`
            return
        }
    }
    else {
        countMiss++
    }
})

                                        // Создаю функцию получения рандомного значения на полуинтервале

function getRandomNumber (max, min){
    let randomNumber = Math.round(Math.random()*(max - min) + min)
    return randomNumber
}

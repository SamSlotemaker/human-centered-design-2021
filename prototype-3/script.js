const API_KEY = 'a17a85a0327a026d6ccffda6769b4782'
const CITY = 'heiloo'
const LAT = '52.36508986732812'
const LON = '4.866084348096675'
const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}`

const testArray = [{ dt: 1619102580, precipitation: 0 }
    , { dt: 1619102640, precipitation: 0 }
    , { dt: 1619102700, precipitation: 0 }
    , { dt: 1619102760, precipitation: 0 }
    , { dt: 1619102820, precipitation: 0 }
    , { dt: 1619102880, precipitation: 0 }
    , { dt: 1619102940, precipitation: 0 }
    , { dt: 1619103000, precipitation: 0 }
    , { dt: 1619103060, precipitation: 0 }
    , { dt: 1619103120, precipitation: 0 }
    , { dt: 1619103180, precipitation: 0 }
    , { dt: 1619103240, precipitation: 0 }
    , { dt: 1619103300, precipitation: 0 }
    , { dt: 1619103360, precipitation: 0 }
    , { dt: 1619103420, precipitation: 0 }
    , { dt: 1619103480, precipitation: 0 }
    , { dt: 1619103540, precipitation: 0 }
    , { dt: 1619103600, precipitation: 0 }
    , { dt: 1619103660, precipitation: 0 }
    , { dt: 1619103720, precipitation: 0 }
    , { dt: 1619103780, precipitation: 0 }
    , { dt: 1619103840, precipitation: 0 }
    , { dt: 1619103900, precipitation: 0 }
    , { dt: 1619103960, precipitation: 0 }
    , { dt: 1619102580, precipitation: 0 }
    , { dt: 1619102640, precipitation: 0 }
    , { dt: 1619102700, precipitation: 0 }
    , { dt: 1619102760, precipitation: 0 }
    , { dt: 1619102820, precipitation: 0 }
    , { dt: 1619102880, precipitation: 0 }
    , { dt: 1619102940, precipitation: 0 }
    , { dt: 1619103000, precipitation: 0 }
    , { dt: 1619103060, precipitation: 0 }
    , { dt: 1619103120, precipitation: 0 }
    , { dt: 1619103180, precipitation: 0 }
    , { dt: 1619103240, precipitation: 0 }
    , { dt: 1619103300, precipitation: 0 }
    , { dt: 1619103360, precipitation: 0 }
    , { dt: 1619103420, precipitation: 0 }
    , { dt: 1619103480, precipitation: 0 }
    , { dt: 1619103540, precipitation: 0 }
    , { dt: 1619103600, precipitation: 0 }
    , { dt: 1619103660, precipitation: 0 }
    , { dt: 1619103720, precipitation: 0 }
    , { dt: 1619103780, precipitation: 1 }
    , { dt: 1619103840, precipitation: 0 }
    , { dt: 1619103900, precipitation: 0 }
    , { dt: 1619103960, precipitation: 0 }
    , { dt: 1619103240, precipitation: 0 }
    , { dt: 1619103300, precipitation: 0 }
    , { dt: 1619103360, precipitation: 0 }
    , { dt: 1619103420, precipitation: 0 }
    , { dt: 1619103480, precipitation: 0 }
    , { dt: 1619103540, precipitation: 0 }
    , { dt: 1619103600, precipitation: 0 }
    , { dt: 1619103660, precipitation: 0 }
    , { dt: 1619103720, precipitation: 0 }
    , { dt: 1619103780, precipitation: 0 }
    , { dt: 1619103840, precipitation: 0 }
    , { dt: 1619103900, precipitation: 0 }
    , { dt: 1619103960, precipitation: 0 }]

const timeElement = document.querySelector('.tijd p')
var msg = new SpeechSynthesisUtterance();
msg.lang = 'nl'

var rainAudio = new Audio('./sounds/rain1.mp3')
var dryAudio = new Audio('./sounds/dry1.mp3')
dryAudio.volume = 0.5
rainAudio.volume = 0.5

let dryMinutes = 61;
getData(API_URL).then(data => {
    const minutesArray = data.minutely
    dryMinutes = findMinutes(testArray)
    console.log(dryMinutes)
})

//returns how many minutes it will stay dry
function findMinutes(array) {
    //return array index when there will be rain
    let dryMinutes = 61
    array.forEach((item, index) => {
        if (item.precipitation > 0) {
            dryMinutes = index
        }
    })
    return dryMinutes;
}


let time = 40
speak(time)
changeElement(time)

function handleScroll(e) {
    if (e.deltaY > 0) {
        if (time > 0) {
            time -= 1;
        }
        speak(time)
        changeElement(time)
        changeWeather(time)
    } else {
        if (time < 60) {
            time += 1;
        }
        speak(time)
        changeElement(time)
        changeWeather(time)
    }
}

function logKey(e) {
    switch (e.code) {
        case 'ArrowLeft':
            if (time > 0) {
                time -= 10;
            }
            speak(time)
            changeElement(time)
            changeWeather(time)
            break;
        case 'ArrowRight':
            time += 10;
            speak(time)
            changeElement(time)

            changeWeather(time)
            break;
        default:
            break;
    }
}

function changeWeather(time) {
    if (time > dryMinutes) {
        document.body.classList.add('rain')
        rainAudio.play()
        dryAudio.pause();
    } else {
        document.body.classList.remove('rain')
        dryAudio.play()
        rainAudio.pause();

    }
}

function changeElement(time) {
    if (time % 60 == 0) {
        let hours = time / 60
        timeElement.textContent = hours + ' uur'
    } else if (time > 60) {
        let hours = Math.floor(time / 60)
        let minutes = time % 60
        timeElement.textContent = hours + ' uur en ' + minutes + ' minuten'
    } else {
        timeElement.textContent = time + ' minuten'
    }
}

function speak(textMessage) {
    window.speechSynthesis.cancel();
    if (time % 60 == 0) {
        let hours = time / 60
        msg.text = hours + 'uur'
    } else if (time > 60) {
        let hours = Math.floor(time / 60)
        let minutes = time % 60
        msg.text = hours + 'uur en ' + minutes + 'minuten'
    } else {
        msg.text = textMessage + "minuten";
    }

    window.speechSynthesis.speak(msg);
}

document.addEventListener('wheel', handleScroll)

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}
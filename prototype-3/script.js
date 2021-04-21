const API_KEY = 'a17a85a0327a026d6ccffda6769b4782'
const CITY = 'heiloo'
const API_URL = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_KEY}`
const cursor = document.querySelector('.cursor')
const timeElement = document.querySelector('.tijd p')
console.log(cursor);


var rainAudio = new Audio('./sounds/rain1.mp3')
var dryAudio = new Audio('./sounds/dry1.mp3')
dryAudio.volume = 0.5
rainAudio.volume = 0.5



async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// getData(API_URL).then(data => {
//     console.log(data)
// })
// window.onclick = function () {
//     dryAudio.play()
// }

document.addEventListener('keydown', logKey);

let time = 40
timeElement.textContent = time + ' Minuten'


function logKey(e) {
    switch (e.code) {
        case 'ArrowLeft':
            if (time > 0) {
                time -= 10;
            }
            timeElement.textContent = time + ' Minuten'
            changeWeather(time)
            break;
        case 'ArrowRight':
            time += 10;
            timeElement.textContent = time + ' Minuten'
            changeWeather(time)
            break;
        default:
            break;
    }
}

function changeWeather(time) {
    if (time > 50) {
        document.body.classList.add('rain')
        rainAudio.play()
        dryAudio.pause();
    } else {
        document.body.classList.remove('rain')
        dryAudio.play()
        rainAudio.pause();

    }
}
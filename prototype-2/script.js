const API_KEY = 'a17a85a0327a026d6ccffda6769b4782'
const CITY = 'heiloo'
const API_URL = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_KEY}`
const cursor = document.querySelector('.cursor')
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
window.onclick = function () {
    dryAudio.play()
}


window.addEventListener('mousemove', (e) => {
    let y = e.pageY - (cursor.offsetHeight / 2)
    let x = e.pageX - (cursor.offsetWidth / 2)
    cursor.style.top = y + 'px'
    cursor.style.left = x + 'px'
})
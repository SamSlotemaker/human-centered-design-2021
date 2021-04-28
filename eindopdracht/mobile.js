const timeSection = document.querySelector('.tijd')
const main = document.querySelector('main')
console.log(timeSection);
if (screen.width < 400) {
}
timeSection.style.height = '1000px'

function handleTimeScroll(e) {
    let totalSrollHeight = main.scrollHeight - main.offsetHeight
    let totalMinutes = 60
    let interval = totalSrollHeight / 60
    let totalAmount = Math.floor(main.scrollTop / interval)
    console.log(totalAmount)
    console.log(main.scrollTop)
}

main.addEventListener("scroll", handleTimeScroll)
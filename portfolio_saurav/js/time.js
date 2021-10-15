setInterval(showTime, 1000);

function showTime() {
    let clock = document.querySelector('.phone-clock');
    let navClock = document.querySelector('.nav-clock');
    let time = new Date();
    let hr = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    hr = hr < 10 ? '0' + hr : hr;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    let res = hr + ":" + min + ":" + sec;
    clock.innerHTML = res;
    navClock.innerHTML = res;
}

showTime();
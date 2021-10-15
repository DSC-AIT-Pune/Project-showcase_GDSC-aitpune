var mainDiv = document.querySelector('.main-first')
var text = document.querySelector('.text-cont')
var img = document.querySelector('.img-cont')

// console.dir(text);

let move = () => {
    text.style.display='block'
    setTimeout(() => {
        text.style.transform = 'translateX(0%)'
        img.style.transform = 'translateX(0)'
    },300)
    
}

mainDiv.addEventListener('mousemove', () => {
    move();
})

mainDiv.addEventListener('touchmove', () => {
    move();
})


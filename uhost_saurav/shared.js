var backdrop = document.querySelector(".backdrop");
var modal = document.querySelector('.modal');
var selectPlanButtons = document.querySelectorAll('.button');
var noButton = document.querySelector(".modal button");
var toggleButton = document.querySelector('.toggle-button');
var mobileNav = document.querySelector('.mobile-nav');

console.dir(modal);

for (let index = 0; index < selectPlanButtons.length; index++) {
    var button = selectPlanButtons[index];
    button.addEventListener('click', () => {
        backdrop.style.display = 'block';
        modal.style.display = 'block';
        setTimeout(() => {
            backdrop.classList.add('open');
            modal.classList.add('open');
        }, 10);
    })
}

backdrop.addEventListener('click', () => {
    backdrop.classList.remove('open');
    modal.classList.remove('open');
    mobileNav.classList.remove('open');
    setTimeout(() => {
        backdrop.style.display = 'none';
        modal.style.display='none';
        mobileNav.style.display='none';
    }, 500);
})

noButton.addEventListener('click', () => {
    backdrop.classList.remove('open');
    modal.classList.remove('open');
    setTimeout(() => {
        backdrop.style.display = 'none';
        modal.style.display = 'none';
    }, 200);
    modal.classList.remove('open');
})

toggleButton.addEventListener('click', () => {
    backdrop.style.display = 'block';
    mobileNav.style.display='block';
    setTimeout(() => {
        backdrop.classList.add('open');
        mobileNav.classList.add('open');
    }, 10);
})
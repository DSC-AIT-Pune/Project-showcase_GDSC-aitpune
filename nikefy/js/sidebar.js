var modal = document.querySelector('.backdrop')
var sidebar = document.querySelector('.sidebar')
var btn = document.querySelector('.nav-switch')
var links = document.querySelectorAll('.links')

const displayModal = () => {
    modal.style.display = 'block';
    sidebar.style.display = 'grid';
    setTimeout(() => {
        sidebar.style.transform = 'translateX(0)';
    }, 100)
   
}

const hideModal = () => {
    sidebar.style.transform = 'translateX(100%)';
    setTimeout(() => {
        modal.style.display = 'none';
        sidebar.style.display = 'none';
    },500)
}


btn.addEventListener('click', () => {
    displayModal();
})

modal.addEventListener('click', () => {
    hideModal();
})


for (let index = 0; index < links.length; index++) {
    const element = links[index];
    element.addEventListener('click', () => {
        hideModal();
    })
}
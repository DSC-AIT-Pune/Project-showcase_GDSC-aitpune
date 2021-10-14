let home = document.querySelectorAll('.icon-home');
let about = document.querySelectorAll('.icon-about');
let skills = document.querySelectorAll('.icon-skills');
let awards = document.querySelectorAll('.icon-awards');
let contact = document.querySelectorAll('.icon-contact');

let homeContent = document.querySelector('.home');
let aboutContent = document.querySelector('.about');
let skillsContent = document.querySelector('.skills');
let awardsContent = document.querySelector('.awards');
let contactContent = document.querySelector('.contact');
let backdrop = document.querySelector('.backdrop');

console.dir(about);

for (let index = 0; index < home.length; index++) {
    const element = home[index];
    element.addEventListener('click', () => {
        backdrop.style.display = 'block'
        modalChange();
        setTimeout(() => {
            homeContent.style.display = 'block';
            aboutContent.style.display = 'none';
            skillsContent.style.display = 'none';
            awardsContent.style.display = 'none';
            contactContent.style.display = 'none';
        }, 1200);
    
        setTimeout(() => {
            backdrop.style.display = 'none'
        }, 2400)
    });
}

for (let index = 0; index < about.length; index++) {
    const element = about[index];
    element.addEventListener('click', () => {
        backdrop.style.display = 'block'
        modalChange();
        setTimeout(() => {
            homeContent.style.display = 'none';
            aboutContent.style.display = 'block';
            skillsContent.style.display = 'none';
            awardsContent.style.display = 'none';
            contactContent.style.display = 'none';
        }, 1200);
    
        setTimeout(() => {
            backdrop.style.display = 'none'
        }, 2400)
    });
}

for (let index = 0; index < skills.length; index++) {
    const element = skills[index];
    element.addEventListener('click', () => {
        backdrop.style.display = 'block'
        modalChange();
        setTimeout(() => {
            homeContent.style.display = 'none';
            aboutContent.style.display = 'none';
            skillsContent.style.display = 'block';
            awardsContent.style.display = 'none';
            contactContent.style.display = 'none';
        }, 1200);
    
        setTimeout(() => {
            backdrop.style.display = 'none'
        }, 2400)
    });
    
}

for (let index = 0; index < awards.length; index++) {
    const element = awards[index];
    element.addEventListener('click', () => {
        backdrop.style.display = 'block'
        modalChange();
        setTimeout(() => {
            homeContent.style.display = 'none';
            aboutContent.style.display = 'none';
            skillsContent.style.display = 'none';
            awardsContent.style.display = 'block';
            contactContent.style.display = 'none';
        }, 1200);
    
        setTimeout(() => {
            backdrop.style.display = 'none'
        }, 2400)
    });
}

for (let index = 0; index < contact.length; index++) {
    const element = contact[index];
    element.addEventListener('click', () => {
        backdrop.style.display = 'block'
        modalChange();
        setTimeout(() => {
            homeContent.style.display = 'none';
            aboutContent.style.display = 'none';
            skillsContent.style.display = 'none';
            awardsContent.style.display = 'none';
            contactContent.style.display = 'block';
        }, 1200);
    
        setTimeout(() => {
            backdrop.style.display = 'none'
        }, 2400)
    });
}

function modalChange() {
    setTimeout(() => {
        backdrop.style.transform = "translateX(0)";
    }, 300)
    setTimeout(() => {
        backdrop.style.transform = "translateX(65rem)";
    }, 1500);
}
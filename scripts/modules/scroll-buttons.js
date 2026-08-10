export default function initScrollButtons() {
    const sections = document.querySelectorAll('section');
    const buttons = document.querySelectorAll('.scroll-link');
    const resnavLinks = document.querySelector('.resnav-links');

    //Scroll to top button functionality
    document.querySelector('.scroll-to-top').addEventListener('click', () => {
        sections[0].scrollIntoView();
    })

    //Scroll to about section/enter website functionality
    document.querySelector('.enter-button').addEventListener('click', () => {
        sections[1].scrollIntoView();
    });

    //Scroll section of the site in button order
    buttons.forEach((link, index) => {
        link.addEventListener('click', () => {
            sections[index].scrollIntoView();
        })
    })

    //Scroll functionality for resnav links (Only the container has class)
    for (let i = 0; i < sections.length; i++) {
        resnavLinks.children[i].addEventListener('click', () => {
            sections[i].scrollIntoView();
        })
    }


}
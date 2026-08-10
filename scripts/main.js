import initNav from './modules/nav.js';
import initProjectCards from './modules/project-cards.js';
import initScrollButtons from './modules/scroll-buttons.js';
import initScrollIntoView from './modules/scroll-into-view.js';
import initCarousel from './modules/carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initProjectCards();
    initScrollButtons();
    initScrollIntoView();
    initCarousel();
})

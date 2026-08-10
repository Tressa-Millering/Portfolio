
export default function initProjectCards() {

    const body = document.querySelector('body');
    const projectCards = document.querySelectorAll('.proj-card');
    const skillLinks = document.querySelectorAll('.skill-link');
    const projectModals = document.querySelectorAll('.modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const resnav = document.querySelector('.resnav');

    let inModal = false;
    let currCard = null;
    let currModal = null;
    let openedByLink = false;

    projectCards.forEach((card, index) => {
        //Open modal on click
        card.addEventListener('click',  () => {
            if (!inModal) {
                openModal(index);
            }
        })

        //Reset scroll on mouse leaving card
        card.addEventListener('mouseleave', () => {
            card.addEventListener('transitionend', function handler() {
                card.children[0].children[1].children[0].scrollTo(0,0)
                card.removeEventListener('transitionend', handler)
            })
        })

        //Prevent card links from opening modals
        card.querySelector('.proj-card-link').addEventListener("click", (e) => {
            e.stopPropagation();
        })
    })

    //Open modal when clicking skill-link
    skillLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (!inModal) {
                openedByLink = true;
                openModal(parseInt(JSON.stringify(link.classList[1]).slice(6))-1)
            }
        })
    })

    //Close modal when clicking escape
    document.addEventListener('keydown', (e) => {
        if (inModal && e.key === 'Escape') {
            closeModal();
        }
    })

    //Close modal from close button
    closeModalButtons.forEach((button) => {
        button.addEventListener('click', () => { closeModal() })
    })

    //Function to open modal
    function openModal(index) {
        currCard = index;
        currModal = index;
        inModal = true;

        resnav.classList.toggle('hide-res-nav');

        projectCards[currCard].children[0].classList.add('animation-lock');
        projectCards[currCard].offsetHeight; // Trigger a reflow, flushing the CSS changes
        body.classList.add('scroll-lock');

        projectModals[currModal].style.display = 'block';
        projectModals[currModal].offsetHeight;
        projectModals[currModal].classList.add('show');
    }

    //Function to close modal
    function closeModal() {
        projectModals[currModal].classList.remove('show')
        projectModals[currModal].classList.add('exit')
        resnav.classList.toggle('hide-res-nav');

        if (!openedByLink) {
            projectModals[currModal].addEventListener('transitionend', function handler(e) {
                if (e.target !== projectModals[currModal]) return;
                if (e.propertyName !== 'top') return;
                finishClose()
                projectModals[currModal].removeEventListener('transitionend', handler)
            })
        } else finishClose()
    }

    //Modal close helper
    function finishClose() {
        projectModals[currModal].scrollTo(0,0);
        projectModals[currModal].style.display = 'none';
        body.classList.remove('scroll-lock');
        projectCards[currCard].children[0].classList.remove('animation-lock');
        inModal = false;
        openedByLink = false;
        projectModals[currModal].classList.remove('exit');
    }

}



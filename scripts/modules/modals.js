
export default function initModals() {

    const cards = document.querySelectorAll('.proj-card');

    const skillLinks = document.querySelectorAll('.skill-link');

    const modals = document.querySelectorAll('.modal');

    const body = document.querySelector('body');

    const closeModalButtons = document.querySelectorAll('.close-modal');

    const resnav = document.querySelector('.resnav');

    let inModal = false;

    let currCard = null;

    let currModal = null;

    let openedByLink = false;

    cards.forEach((card, index) => {
        card.addEventListener('click',  () => {
            if (!inModal) {
                openModal(index);
            }
        })
        card.addEventListener('mouseleave', () => {
            card.addEventListener('transitionend', function handler() {
                card.children[0].children[1].children[0].scrollTo(0,0)
                card.removeEventListener('transitionend', handler)
            })
        })
    })

    skillLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (!inModal) {
                openedByLink = true;
                openModal(parseInt(JSON.stringify(link.classList[1]).slice(6))-1)
            }
        })
    })


    document.addEventListener('keydown', (e) => {
        if (inModal && e.key === 'Escape') {
            closeModal();
        }
    })


    closeModalButtons.forEach((button) => {
        button.addEventListener('click', () => { closeModal() })
    })

    function openModal(index) {
        currCard = index;
        currModal = index;
        inModal = true;

        resnav.classList.toggle('hide-res-nav');

        cards[currCard].children[0].classList.add('animation-lock');
        cards[currCard].offsetHeight; // Trigger a reflow, flushing the CSS changes
        body.classList.add('scroll-lock');

        modals[currModal].style.display = 'block';
        modals[currModal].offsetHeight;
        modals[currModal].classList.add('show');
    }

    function closeModal() {
        modals[currModal].classList.remove('show')
        modals[currModal].classList.add('exit')
        resnav.classList.toggle('hide-res-nav');

        if (!openedByLink) {
            modals[currModal].addEventListener('transitionend', function handler(e) {
                if (e.target !== modals[currModal]) return;
                if (e.propertyName !== 'top') return;
                finishClose()
                modals[currModal].removeEventListener('transitionend', handler)
            })
        } else finishClose()
    }

    function finishClose() {
        modals[currModal].scrollTo(0,0);
        modals[currModal].style.display = 'none';
        body.classList.remove('scroll-lock');
        cards[currCard].children[0].classList.remove('animation-lock');
        inModal = false;
        openedByLink = false;
        modals[currModal].classList.remove('exit');
    }

}



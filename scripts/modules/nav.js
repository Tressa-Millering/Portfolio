export default function initNav() {
    const navbar = document.querySelector('.navbar');
    const scrollButton = document.querySelector('.scroll-to-top');
    const resnavOpen = document.querySelector('.resnav-open');

    let scrolled = false;

    //Set scrolled status on page load (for refreshing)
    if (window.innerWidth < 945) {
        scrolled = true;
        navbar.classList.add('scrolled');
    }

    //Debounce for resizing and scrolling
    const debounce = (fn, t) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), t)
        }
    };

    const resizeDebounce = debounce(() => {
        if (window.innerWidth >= 945) {
            scrolled = false;
            navbar.classList.remove('scrolled');
            return;
        }
        scrolled = true;
        navbar.classList.add('scrolled');
    }, 200);

    const scrollDebounce = debounce(() => {
        if (window.scrollY >= 150) {
            scrollButton.style.opacity = '1';
            if (!scrolled) {
                scrolled = true;
                navbar.classList.add('scrolled');
                navbar.style.paddng = ""
                return;
            }
        }

        if (window.scrollY < 150) {
            scrollButton.style.opacity = '0';

            if (window.innerWidth >= 945 && scrolled) {
                scrolled = false;
                navbar.classList.remove('scrolled');
            }
        }
    }, 25)

    document.addEventListener('scroll', scrollDebounce);
    window.addEventListener('resize', resizeDebounce);

    //Open responsive navbar on click
    resnavOpen.addEventListener('click', (e) => {
        e.preventDefault();
        resnavOpen.children[0].checked = !resnavOpen.children[0].checked;
        resnavOpen.nextElementSibling.classList.toggle('resnav-active');
    });

    //Close responsive navbar when clicking escape
    document.addEventListener('keydown', (e) => {
        if (resnavOpen.children[0].checked && e.key === 'Escape') {
            resnavOpen.children[0].checked = false;
            resnavOpen.nextElementSibling.classList.toggle('resnav-active');
        }
    })

}


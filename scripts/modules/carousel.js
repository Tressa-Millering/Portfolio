export default function initCarousel() {
    //Debouncing function for resizing
    const debounce = (fn, t) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), t)
        }
    };

    // Create Carousel Objects
    const carousels = [];
    document.querySelectorAll('.carousel').forEach((carousel, index) => {
        carousels[index] = {
            content: carousel.children[0],
            currIndex: 0,
            currPos: 0,
            length: carousel.children[0].childElementCount,
            prevButton: carousel.querySelector('.carousel-prev'),
            nextButton: carousel.querySelector('.carousel-next'),
            selectors: carousel.children[1].children[2].querySelectorAll('button')
        }
    })



    //Update aria-selected attribute for selectors
    function setSelectors(carousel, selector) {
        carousel.selectors.forEach((s) => { s.ariaSelected = 'false'; })
        selector.ariaSelected = (selector.ariaSelected === 'true') ? 'false' : 'true';
    }

    //Get current carousel image position
    function getCurrentPosition(carousel, index) {
        return carousel.content.children[index].offsetLeft;
    }

    //Update carousel widths on resize
    function updateWidths(carousel) {
        carousel.currPos = getCurrentPosition(carousel, carousel.currIndex)
        carousel.content.style.transform = `translateX(-${carousel.currPos}px)`
    }

    //Apply resize debounce
    const resizeDebounce = debounce(() => {carousels.forEach(carousel => {updateWidths(carousel)})}, 200);
    window.addEventListener('resize', resizeDebounce)

    carousels.forEach((carousel, index) => {
        //Add functionality to next button
        carousel.nextButton.addEventListener('click', () => {
            carousel.currIndex++;
            if (carousel.currIndex >= carousel.length) {
                carousel.currIndex = 0;
                carousel.currPos = 0;
            } else {
                carousel.currPos = carousel.content.children[carousel.currIndex].offsetLeft;
            }
            setSelectors(carousel, carousel.selectors[carousel.currIndex]);
            carousel.content.style.transform = `translateX(-${carousel.currPos}px)`;
        })

        //Add functionality to previous button
        carousel.prevButton.addEventListener('click', () => {
            carousel.currIndex--;
            if (carousel.currIndex < 0) {
                carousel.currIndex = carousel.length - 1;
                carousel.currPos = getCurrentPosition(carousel, carousel.currIndex);
            } else {
                carousel.currPos = carousel.content.children[carousel.currIndex].offsetLeft;
            }
            setSelectors(carousel, carousel.selectors[carousel.currIndex])
            carousels[index].content.style.transform = `translateX(-${carousels[index].currPos}px)`;
        })

        //Add functionality to selector buttons
        carousel.selectors.forEach((selector, index) => {
            selector.addEventListener('click', () => {
                setSelectors(carousel, selector)
                carousel.currIndex = index;
                carousel.currPos = carousel.content.children[index].offsetLeft;
                carousel.content.style.transform = `translateX(-${carousel.currPos}px)`;

            })
        })
    })



}


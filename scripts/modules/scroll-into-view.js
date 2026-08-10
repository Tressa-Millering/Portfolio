export default function initScrollIntoView () {
    const items = document.querySelectorAll(".exp-content");

    //Scroll experiences into view, fade them out when not centered
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.parentElement.classList.toggle('is-active', entry.isIntersecting);
            });
        },
        {
            threshold: 0.7
        }
    );

    items.forEach((el) => observer.observe(el));

}
import animejs from 'animejs';

/**
 * Check if er are here for the first time
 *
 * @type {boolean}
 */
let firstPageLoad = true;

/**
 * Page intro animation
 *
 * @param callback
 * @param elements
 */
export const pageIntro = (callback, elements) => {
    if (firstPageLoad) {
        elements.mainContainer.classList.add("show");
        firstPageLoad = false;
        return;
    }

    // Check if user doesn't like motion
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if(typeof window.scrollTo === "function") {
            window.scrollTo(0, 0);
        }

        callback();
        return;
    }

    transition('intro', callback, elements);
};

/**
 * Page outro animation
 *
 * @param callback
 * @param elements
 */
export const pageOutro = (callback, elements) => {
    if (firstPageLoad) {
        elements.mainContainer.classList.add("show");
        firstPageLoad = false;
        return;
    }

    // Check if user doesn't like motion
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if(typeof window.scrollTo === "function") {
            window.scrollTo(0, 0);
        }

        callback();
        return;
    }

    transition('outro', callback, elements);
};

/**
 * @param type
 * @param callback
 * @param elements
 */
const transition = (type, callback, elements) => {
    const tl = animejs.timeline({
        complete: () => {
            if(type === 'outro') {
                if(typeof window.scrollTo === "function") {
                    window.scrollTo(0, 0);
                }
            }

            callback();
        }
    });

    let opacity = [];
    let ease = '';
    let duration = 300;

    if (type === 'intro') {
        opacity = [0, 1];
        ease = 'easeOutQuart';
        duration = 800;
    }
    if (type === 'outro') {
        opacity = [1, 0];
        ease = 'easeInQuart';
    }

    tl.add({
        targets: elements.mainContainer,
        duration: duration,
        opacity: opacity,
        easing: ease
    }, 0);
};

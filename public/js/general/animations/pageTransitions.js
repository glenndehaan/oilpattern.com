import {TweenMax} from 'gsap';

/**
 * Initial intro animation
 * @param callback
 * @param elements
 */
export const mainIntro = (callback, elements) => {
    TweenMax.to(document.querySelector("#preloader"), 1, {
        opacity: 0,
        display: 'none'
    });

    TweenMax.to(elements.mainContainer, 1, {
        opacity: 1,
        onComplete: callback
    });
};

/**
 * Page intro animation
 * @param callback
 * @param elements
 */
export const pageIntro = (callback, elements) => {
    TweenMax.to(elements.mainContainer, 1, {
        opacity: 1,
        onComplete: callback
    });
};

/**
 * Page outro animation
 * @param callback
 * @param elements
 */
export const pageOutro = (callback, elements) => {
    TweenMax.to(elements.mainContainer, 1, {
        opacity: 0,
        onComplete: callback
    });
};

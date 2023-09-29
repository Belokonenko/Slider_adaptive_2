const container = document.querySelector(".novelties__container");
const slider = document.querySelector(".novelties__slider");
const slides = document.querySelectorAll(".novelties__slide").length;
const buttons = document.querySelectorAll(".novelties__btn");
const btnLeft = document.querySelector(".novelties__btn-left");
const btnRight = document.querySelector(".novelties__btn-right");

let currentPosition = 0;
let currentMargin = 0;
let slidesPerPage = 0;
let slidesCount = slides - slidesPerPage;
let containerWidth = container.offsetWidth;
var prevKeyActive = false;
var nextKeyActive = true;

const debounce = (callback, timeout) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(), timeout);
};

window.addEventListener("resize", checkWidth);

function checkWidth() {
    console.log("checkWidth");

    containerWidth = container.offsetWidth;

    setParams(containerWidth);
}

function setParams(w) {
    if (w < 551) {
        slidesPerPage = 1;
    } else {
        if (w < 901) {
            slidesPerPage = 2;
        } else {
            if (w < 1101) {
                slidesPerPage = 3;
            } else {
                slidesPerPage = 4;
            }
        }
    }

    slidesCount = slides - slidesPerPage; // количество скрытых слайдов

    if (currentPosition > slidesCount) {
        currentPosition -= slidesPerPage;
    }

    currentMargin = -currentPosition * (100 / slidesPerPage);
    slider.style.marginLeft = currentMargin + "%";

    if (currentPosition > 0) {
        buttons[0].classList.remove("inactive");
    }
    if (currentPosition < slidesCount) {
        buttons[1].classList.remove("inactive");
    }
    if (currentPosition >= slidesCount) {
        buttons[1].classList.add("inactive");
    }
}

setParams();

function slideRight() {
    if (currentPosition != 0) {
        slider.style.marginLeft = currentMargin + 100 / slidesPerPage + "%";
        currentMargin += 100 / slidesPerPage;
        currentPosition--;
    }

    if (currentPosition === 0) {
        buttons[0].classList.add("inactive");
    }

    if (currentPosition < slidesCount) {
        buttons[1].classList.remove("inactive");
    }
}

function slideLeft() {
    if (currentPosition != slidesCount) {
        slider.style.marginLeft = currentMargin - 100 / slidesPerPage + "%";
        currentMargin -= 100 / slidesPerPage;
        currentPosition++;
    }

    if (currentPosition == slidesCount) {
        buttons[1].classList.add("inactive");
    }

    if (currentPosition > 0) {
        buttons[0].classList.remove("inactive");
    }
}

// ---  buttons ---

btnLeft.addEventListener("click", () => {
    slideRight();
});

btnRight.addEventListener("click", () => {
    slideLeft();
});

// ---  /buttons ---

// ---  swipe slides ---

slider.addEventListener("touchstart", handleTouchStart, false);
slider.addEventListener("touchmove", handleTouchMove, false);

let x1 = null;

function handleTouchStart(event) {
    x1 = event.touches[0].clientX;
}

let timeoutId;

function handleTouchMove(event) {
    if (!x1) {
        return false;
    }

    let x2 = event.touches[0].clientX;
    let xDiff = x1 - x2;

    debounce(() => {
        console.log(xDiff);
        console.log(slider);
        if (xDiff < 0) {
            slideRight();
        }
    }, 500);
}

// --- /swipe slides ---

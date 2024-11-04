const images = [
    'img/slide1.jpg',
    'img/slide2.jpg',
    'img/slide3.jpg',
    'img/slide4.jpg',
    'img/slide5.jpg'
];

let currentIndex = 0;

function changeBackground() {
    const app = document.getElementById('app');
    app.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
}

export function startBackgroundSlider() {
    changeBackground();
    setInterval(changeBackground, 8000);
}
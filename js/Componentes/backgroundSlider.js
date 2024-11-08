const gradients = [
    'radial-gradient(circle, #d2b48c, #8b4513)',
    'radial-gradient(circle, #f5deb3, #a0522d)',
    'radial-gradient(circle, #deb887, #8b4513)',
    'radial-gradient(circle, #ffe4c4, #a52a2a)',
    'radial-gradient(circle, #d2b48c, #5a3d1e)'
];

let currentIndex = 0;

function changeBackground() {
    const app = document.getElementById('root'); 
    app.style.background = gradients[currentIndex]; 
    currentIndex = (currentIndex + 1) % gradients.length; 
} 

export function startBackgroundSlider() { 
    changeBackground(); 
    setInterval(changeBackground, 5000); 
}
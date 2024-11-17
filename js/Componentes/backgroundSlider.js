const gradients = [
    'radial-gradient(circle, #bdac97, #dfaf8c)',
    'radial-gradient(circle, #f5deb3, #a3877a)',
    'radial-gradient(circle, #deb887, #bf977a)',
    'radial-gradient(circle, #ffe4c4, #ef8080)',
    'radial-gradient(circle, #d2b48c, #d5a169)'
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
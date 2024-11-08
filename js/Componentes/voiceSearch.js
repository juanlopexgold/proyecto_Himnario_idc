export function startVoiceSearch() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const searchButton = document.getElementById('search-button');
    searchButton.style.fontSize = '24px'; // Agrandar el icono

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const searchInput = document.getElementById('search-input');
        searchInput.value = transcript;
        const searchEvent = new Event('input');
        searchInput.dispatchEvent(searchEvent);
    };

    recognition.onspeechend = () => {
        recognition.stop();
        searchButton.style.fontSize = '20px'; // Restaurar el tamaño del icono
    };

    recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ', event.error);
        searchButton.style.fontSize = '20px'; // Restaurar el tamaño del icono
    };
}
// import { loadComments } from "./comments.js";
import { showWelcomeMessage } from "./WelcomeMessage.js";

export function Main() {
    const main = document.createElement('main');
    main.id = 'main-content';
    main.className = 'mini-container';

    // Inicialmente muestra el mensaje de bienvenida
    main.appendChild(showWelcomeMessage());
    // main.appendChild(loadComments());

    return main;
}
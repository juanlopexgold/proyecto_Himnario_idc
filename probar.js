import { createMenuBar } from './menuBar.js';
import { showWelcomeMessage, loadCantos, loadFavoritos } from './contentLoader.js';
import { loadPersonalSongs, showPersonalSongForm } from './personalSongs.js';
import { loadContact } from './contact.js';
import { startBackgroundSlider } from './backgroundSlider.js';
import { loadComments, showCommentForm } from './comments.js';
import { addRoute, initRouter } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const menuBar = createMenuBar();
    app.insertBefore(menuBar, app.firstChild);

    // Iniciar el slider de fondo
    startBackgroundSlider();

    // Definir rutas
    addRoute('home', () => {
        showWelcomeMessage();
        loadComments();
    });
    addRoute('cantos', loadCantos);
    addRoute('favoritos', loadFavoritos);
    addRoute('lista-personales', loadPersonalSongs);
    addRoute('nuevo-editar', showPersonalSongForm);
    addRoute('contacto', loadContact);
    addRoute('comentarios', showCommentForm);

    // Iniciar el ruteo
    initRouter();
});
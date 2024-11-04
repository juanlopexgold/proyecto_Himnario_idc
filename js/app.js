import { createMenuBar } from './menuBar.js';
import { showWelcomeMessage, loadCantos, loadFavoritos } from './contentLoader.js';
import { loadPersonalSongs, showPersonalSongForm } from './personalSongs.js';
import { loadContact } from './contact.js';
import { startBackgroundSlider } from './backgroundSlider.js';
import { loadComments, showCommentForm } from './comments.js';
// import { addTooltip } from './tooltips.js';
import { menuItems } from './opcionMenu.js';
// import { loadFavoritos } from './favorites.js';


document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const menuBar = createMenuBar();
    app.insertBefore(menuBar, app.firstChild);

    // Iniciar el slider de fondo
    startBackgroundSlider();

    // Mostrar mensaje de bienvenida al cargar la aplicación
    showWelcomeMessage();

    // Cargar los últimos comentarios
    loadComments();

    // // Añadir tooltips a elementos del menú
    // addTooltip(document.querySelector('.menu-items a[href="#cantos"]'), 'Ver todos los cantos');
    // addTooltip(document.querySelector('.menu-items a[href="#favoritos"]'), 'Ver tus favoritos');

    // Manejar navegación
    document.querySelector('.menu-items a[href="#cantos"]').addEventListener('click', (e) => {
        e.preventDefault();
        loadCantos();

        // Habilitar los elementos del buscador
        document.getElementById('search-type').disabled = false;
        document.getElementById('search-input').disabled = false;
        document.getElementById('search-button').disabled = false;
    });

    document.querySelector('.menu-items a[href="#favoritos"]').addEventListener('click', (e) => {
        e.preventDefault();
        loadFavoritos();
        // Deahabilitar los elementos del buscador
        document.getElementById('search-type').disabled = true;
        document.getElementById('search-input').disabled = true;
        document.getElementById('search-button').disabled = true;
    });

    document.querySelector('.menu-items a[href="#lista-personales"]').addEventListener('click', (e) => {
        e.preventDefault();
        loadPersonalSongs();
        // Deahabilitar los elementos del buscador
        document.getElementById('search-type').disabled = true;
        document.getElementById('search-input').disabled = true;
        document.getElementById('search-button').disabled = true;
    });

    document.querySelector('.menu-items a[href="#nuevo-editar"]').addEventListener('click', (e) => {
        e.preventDefault();
        showPersonalSongForm();
        // Deahabilitar los elementos del buscador
        document.getElementById('search-type').disabled = true;
        document.getElementById('search-input').disabled = true;
        document.getElementById('search-button').disabled = true;
    });

    document.querySelector('.menu-items a[href="#contacto"]').addEventListener('click', (e) => {
        e.preventDefault();
        loadContact();
        // Deahabilitar los elementos del buscador
        document.getElementById('search-type').disabled = true;
        document.getElementById('search-input').disabled = true;
        document.getElementById('search-button').disabled = true;     
    });

    document.querySelector('.menu-items a[href="#comentarios"]').addEventListener('click', (e) => {
        e.preventDefault();
        showCommentForm();
        // Deahabilitar los elementos del buscador
        document.getElementById('search-type').disabled = true;
        document.getElementById('search-input').disabled = true;
        document.getElementById('search-button').disabled = true;
    });
});
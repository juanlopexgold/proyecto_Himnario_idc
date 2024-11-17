import { showWelcomeMessage } from "./WelcomeMessage.js";
import { loadCantos, loadFavoritos, loadPresentar } from "./contentLoader.js";
import { loadPersonalSongs, showPersonalSongForm } from "./personalSongs.js";
import { loadContact } from "./contact.js";
import { showCommentForm } from "./comments.js";
import { loadBibleContent } from "./bibleModule.js";
import { showCommunityAccessMessage } from "./CommunityAccessMessage.js";
import { loadPersonalSermons, loadSermons, showSermonForm } from "./sermonModule.js";

export async function Router() {
    const d = document;
    const $main = d.getElementById('main-content');
    let { hash } = location;

    // Limpiar el contenido del main-content
    $main.innerHTML = '';

    // Restaurar estilos del contenedor
    navigateToOtherSection();

    // Cerrar cualquier modal si está abierto
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }

    if (!hash || hash === '#/') {
        $main.appendChild(showWelcomeMessage());
    } else if (hash === '#cantos') {
        await loadCantos();
    } else if (hash === '#favoritos') {
        loadFavoritos();
    } else if (hash === '#precentacion') {
        loadPresentar();
    } else if (hash === '#lista-personales') {
        loadPersonalSongs();
    } else if (hash === '#nuevo-canto') {
        showPersonalSongForm();
    } else if (hash === '#ComnunidadCantos' || hash === '#ComnunidadSermones') {
        showCommunityAccessMessage();
    } else if (hash === '#biblia') {
        await loadBibleContent();
    } else if (hash === '#favoritosBiblia') {
        $main.innerHTML = '<h2>esta seccion aun esta en proceso</h2>';
    } else if (hash === '#bibliaPresentar') {
        $main.innerHTML = '<h2>esta seccion aun esta en proceso</h2>';
    } else if (hash === '#sermones') {
        loadSermons();
    } else if (hash === '#lista-sermones-personales') {
        loadPersonalSermons();
    } else if (hash === '#nuevo-sermon') {
        showSermonForm();
    } else if (hash === '#comentarios') {
        $main.innerHTML = '<h2>Sección de comentarios en proceso</h2>';
    } else if (hash === '#conocenos') {
        $main.innerHTML = '<h2>Sección de conocenos en proceso</h2>';
    } else if (hash === '#contacto') {
        loadContact();
    } else {
        $main.innerHTML = '<h2>Sección no encontrada</h2>';
    }

    // d.querySelector('.loader').style.display = 'none';
}

function navigateToOtherSection() {
    const contentDiv = document.getElementById('main-content');
    const menuBar = document.getElementById('menu-bar');
    if (contentDiv) {
        contentDiv.classList.remove('presentation'); // Quitar clase para restaurar estilos
    }
    if (menuBar) {
        menuBar.classList.remove('hidden'); // Mostrar el menú de navegación
    }
}
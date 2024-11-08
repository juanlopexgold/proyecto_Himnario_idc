import { showWelcomeMessage } from "./WelcomeMessage.js";
import { loadCantos, loadFavoritos } from "./contentLoader.js";
import { loadPersonalSongs, showPersonalSongForm } from "./personalSongs.js";

export async function Router() {
    const d = document;
    const $main = d.getElementById('main-content');
    let { hash } = location;

    // Limpiar el contenido del main-content
    $main.innerHTML = '';

    if (!hash || hash === '#/') {
        $main.appendChild(showWelcomeMessage());
        document.getElementById('search-type').disabled = true;
        document.getElementById('search-input').disabled = true;
        document.getElementById('search-button').disabled = true;
    } else if (hash === '#cantos') {
        await loadCantos();
        document.getElementById('search-type').disabled = false;
        document.getElementById('search-input').disabled = false;
        document.getElementById('search-button').disabled = false;
    } else if (hash === '#favoritos') {
        // $main.appendChild(await loadFavoritos());
        loadFavoritos();
    } else if (hash === '#lista-personales') {
        loadPersonalSongs();
    } else if (hash === '#nuevo-editar') {
        showPersonalSongForm();
    } else if (hash === '#contacto') {
        loadContact();
    // } else if (hash === '#comentarios') {
    //     $main.appendChild(loadComments());
    //     $main.appendChild(showCommentForm());
    } else {
        $main.innerHTML = '<h2>Sección no encontrada</h2>';
    }

    // d.querySelector('.loader').style.display = 'none';
}
import { startVoiceSearch } from "./voiceSearch.js";

export function Search() {
    const searchDiv = document.createElement('div');
    searchDiv.className = 'search';
    searchDiv.innerHTML = `
        <select id="search-type" disabled>
            <option value="numero">Buscar por número</option>
            <option value="nombre">Buscar por nombre</option>
        </select>
        <div class="search-box" disabled>
            <i id="search-button" disabled>🎤</i>
            <input type="search" id="search-input" placeholder="Buscar..." disabled>
        </div>
    `;

    searchDiv.querySelector('#search-button').addEventListener('click', startVoiceSearch);

    return searchDiv;
}
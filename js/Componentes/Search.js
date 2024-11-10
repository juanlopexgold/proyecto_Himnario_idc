import { startVoiceSearch } from "./voiceSearch.js";

export function Search(idSuffix = '') {
    const searchDiv = document.createElement('div');
    searchDiv.className = 'search';
    searchDiv.innerHTML = `
        <select id="search-type${idSuffix}">
            <option value="numero">Buscar por número</option>
            <option value="nombre">Buscar por nombre</option>
        </select>
        <div class="search-box">
            <i id="search-button${idSuffix}">🎤</i>
            <input type="search" id="search-input${idSuffix}" placeholder="Buscar...">
        </div>
    `;

    searchDiv.querySelector(`#search-button${idSuffix}`).addEventListener('click', startVoiceSearch);

    return searchDiv;
}
let personalSongs = JSON.parse(localStorage.getItem('personalSongs')) || [];

function savePersonalSongs() {
    localStorage.setItem('personalSongs', JSON.stringify(personalSongs));
}

export function loadPersonalSongs() {
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = ''; // Limpiar el contenido anterior

    contentDiv.classList.add('personal-songs-content');
    if (personalSongs.length === 0) {
        contentDiv.innerHTML = '<p>No hay cantos personales aún.</p>';
        return contentDiv;
    }

    const titles = personalSongs.map(canto => `
        <li data-id="${canto.id}">
            ${canto.id} - ${canto.titulo}
            <span class="edit-icon" data-id="${canto.id}">✏️</span>
        </li>
    `).join('');
    contentDiv.innerHTML = `<ul>${titles}</ul>`;

    // Agregar evento de clic a los títulos de cantos personales
    document.querySelectorAll('#main-content li').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-icon')) {
                const canto = personalSongs.find(c => c.id === item.getAttribute('data-id'));
                showPersonalSongForm(canto);
                return; // Evitar que el clic en el lápiz cargue el canto
            }
            const canto = personalSongs.find(c => c.id === item.getAttribute('data-id'));
            const paragraphs = canto.contenido.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
            contentDiv.innerHTML = `
                <h2>${canto.titulo}</h2>
                ${paragraphs}
                <button id="back-button">◀ REGRESAR</button>
            `;

            // Agregar evento de clic al botón de regreso
            document.getElementById('back-button').addEventListener('click', loadPersonalSongs);
        });
    });

    return contentDiv;
}

export function showPersonalSongForm(canto = null) {
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = ''; // Limpiar el contenido anterior

    contentDiv.classList.add('personal-song-form-content');
    const isEditing = canto !== null;
    const formTitle = isEditing ? 'Editar Canto Personal' : 'Nuevo Canto Personal';
    const buttonText = isEditing ? 'Guardar Cambios' : 'Agregar Canto';
    const id = isEditing ? canto.id : personalSongs.length ? String(personalSongs.length + 1).padStart(4, '0') : '0001';
    const titulo = isEditing ? canto.titulo : '';
    const contenido = isEditing ? canto.contenido : '';

    contentDiv.innerHTML = `
        <h2>${formTitle}</h2>
        <form id="personal-song-form">
            <input type="hidden" id="canto-id" value="${id}">
            <label for="canto-titulo">Nombre:</label>
            <input type="text" id="canto-titulo" value="${titulo}" required>
            <label for="canto-contenido">Contenido:</label>
            <textarea id="canto-contenido" required>${contenido}</textarea>
            <button type="submit">${buttonText}</button>
        </form>
        <button id="back-button">◀ REGRESAR</button>
    `;
    
    document.getElementById('personal-song-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('canto-id').value;
        const titulo = document.getElementById('canto-titulo').value;
        const contenido = document.getElementById('canto-contenido').value;
        
        if (isEditing) {
            const index = personalSongs.findIndex(c => c.id === id);
            personalSongs[index] = { id, titulo, contenido };
        } else {
            personalSongs.push({ id, titulo, contenido });
        }
        
        savePersonalSongs();
        loadPersonalSongs();
    });
    
    // Agregar evento de clic al botón de regreso
    document.getElementById('back-button').addEventListener('click', loadPersonalSongs);
}
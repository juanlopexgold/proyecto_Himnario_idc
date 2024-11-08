let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function saveFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

export async function loadCantos() {
    try {
        const response = await fetch('../data/content.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const contentDiv = document.getElementById('main-content');
        contentDiv.innerHTML = ''; // Limpiar el contenido anterior
        contentDiv.className = 'mini-container';

        // Mostrar los títulos de los cantos con sus números y el icono de corazón
        const titles = data.cantos.map(canto => `
            <li data-id="${canto.id}">
                ${canto.id} - ${canto.titulo}
                <span class="heart-icon ${favoritos.some(fav => fav.id === canto.id) ? 'favorited' : ''}" data-id="${canto.id}">♥</span>
            </li>
        `).join('');
        contentDiv.innerHTML = `<ul>${titles}</ul>`;

        // Agregar evento de clic a los títulos
        document.querySelectorAll('#main-content li').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('heart-icon')) {
                    return; // Evitar que el clic en el corazón cargue el canto
                }
                const canto = data.cantos.find(c => c.id === item.getAttribute('data-id'));
                const paragraphs = canto.contenido.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
                contentDiv.innerHTML = `
                    <h2>${canto.titulo}</h2>
                    ${paragraphs}
                `;
            });
        });

        // Agregar funcionalidad de favoritos
        document.querySelectorAll('.heart-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const cantoId = e.target.getAttribute('data-id');
                const canto = data.cantos.find(c => c.id === cantoId);
                if (favoritos.some(fav => fav.id === cantoId)) {
                    favoritos = favoritos.filter(fav => fav.id !== cantoId);
                    e.target.classList.remove('favorited');
                } else {
                    favoritos.push(canto);
                    e.target.classList.add('favorited');
                }
                saveFavoritos();
                e.stopPropagation(); // Evitar que el clic en el corazón cargue el canto
            });
        });

        // Función para filtrar y mostrar los cantos
        function filterCantos() {
            const searchType = document.getElementById('search-type').value;
            const searchInput = document.getElementById('search-input').value.toLowerCase();
            let filteredCantos;

            if (searchType === 'numero') {
                filteredCantos = data.cantos.filter(canto => canto.id.includes(searchInput));
            } else {
                filteredCantos = data.cantos.filter(canto => canto.titulo.toLowerCase().includes(searchInput));
            }

            const filteredTitles = filteredCantos.map(canto => `
                <li data-id="${canto.id}">
                ${canto.id} - ${canto.titulo}
                <span class="heart-icon ${favoritos.some(fav => fav.id === canto.id) ? 'favorited' : ''}" data-id="${canto.id}">♥</span>
                </li>
            `).join('');
            contentDiv.innerHTML = `<ul>${filteredTitles}</ul>`;

            // Agregar evento de clic a los títulos filtrados
            document.querySelectorAll('#main-content li').forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target.classList.contains('heart-icon')) {
                        return; // Evitar que el clic en el corazón cargue el canto
                    }
                    const canto = data.cantos.find(c => c.id === item.getAttribute('data-id'));
                    const paragraphs = canto.contenido.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
                    contentDiv.innerHTML = `
                        <h2>${canto.titulo}</h2>
                        ${paragraphs}
                    `;
                });
            });

            // Agregar funcionalidad de favoritos a los resultados filtrados
            document.querySelectorAll('.heart-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    const cantoId = e.target.getAttribute('data-id');
                    const canto = data.cantos.find(c => c.id === cantoId);
                    if (favoritos.some(fav => fav.id === cantoId)) {
                        favoritos = favoritos.filter(fav => fav.id !== cantoId);
                        e.target.classList.remove('favorited');
                    } else {
                        favoritos.push(canto);
                        e.target.classList.add('favorited');
                    }
                    saveFavoritos();
                    e.stopPropagation(); // Evitar que el clic en el corazón cargue el canto
                });
            });
        }

        // Agregar funcionalidad de búsqueda en tiempo real
        document.getElementById('search-input').addEventListener('input', filterCantos);
        document.getElementById('search-button').addEventListener('click', filterCantos);

    } catch (error) {
        console.error('Error loading content:', error);
    }
}

export function loadFavoritos() {
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = ''; // Limpiar el contenido anterior
    contentDiv.className = 'mini-container';

    if (favoritos.length === 0) {
        contentDiv.innerHTML = '<p>No hay favoritos aún.</p>';
        return;
    }

    const titles = favoritos.map(canto => `
    <li data-id="${canto.id}">
      ${canto.id} - ${canto.titulo}
      <span class="heart-icon favorited" data-id="${canto.id}">♥</span>
    </li>
  `).join('');
    contentDiv.innerHTML = `<ul>${titles}</ul>`;

    // Agregar evento de clic a los títulos de favoritos
    document.querySelectorAll('#main-content li').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('heart-icon')) {
                return; // Evitar que el clic en el corazón cargue el canto
            }
            const canto = favoritos.find(c => c.id === item.getAttribute('data-id'));
            const paragraphs = canto.contenido.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
            contentDiv.innerHTML = `
                <h2>${canto.titulo}</h2>
                ${paragraphs}
            `;
        });
    });

    // Agregar funcionalidad de favoritos a la lista de favoritos
    document.querySelectorAll('.heart-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const cantoId = e.target.getAttribute('data-id');
            favoritos = favoritos.filter(fav => fav.id !== cantoId);
            saveFavoritos();
            loadFavoritos();
            e.stopPropagation(); // Evitar que el clic en el corazón cargue el canto
        });
    });
}
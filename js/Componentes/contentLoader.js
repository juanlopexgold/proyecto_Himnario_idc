let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let presentar = JSON.parse(localStorage.getItem('presentar')) || [];

function saveFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function savePresentar() {
    localStorage.setItem('presentar', JSON.stringify(presentar));
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
        contentDiv.classList.add('content_cantos');

        // Mostrar los títulos de los cantos con sus números y el icono de corazón
        const titles = data.cantos.map(canto => `
            <li data-id="${canto.id}">
                ${canto.id} - ${canto.titulo}
                <span class="heart-icon ${favoritos.some(fav => fav.id === canto.id) ? 'favorited' : ''}" data-id="${canto.id}">♥</span>
                <span class="play-icon" data-id="${canto.id}">▶</span>
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
                    <button id="back-button">◀ REGRESAR</button>
                `;
                // Agregar evento de clic al botón de regreso
                document.getElementById('back-button').addEventListener('click', loadCantos);
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

        // Agregar funcionalidad de presentación
        document.querySelectorAll('.play-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const cantoId = e.target.getAttribute('data-id');
                const canto = data.cantos.find(c => c.id === cantoId);
                if (canto && !presentar.some(p => p.id === cantoId)) {
                    presentar.push(canto);
                    savePresentar();
                    console.log('Canto agregado a la lista de presentación:', canto);
                }
                e.stopPropagation(); // Evitar que el clic en el icono cargue el canto
            });
        });

        // Función para filtrar y mostrar los cantos
        function filterCantos(idSuffix = '') {
            const searchType = document.getElementById(`search-type${idSuffix}`).value;
            const searchInput = document.getElementById(`search-input${idSuffix}`).value.toLowerCase();

            let filteredCantos;

            if (searchType === 'numero') {
                filteredCantos = data.cantos.filter(canto => canto.id.toString().includes(searchInput));
            } else {
                filteredCantos = data.cantos.filter(canto => canto.titulo.toLowerCase().includes(searchInput));
            }

            if (filteredCantos.length === 0) {
                contentDiv.innerHTML = '<p>No existen coincidencias.</p>';
                return;
            }

            const filteredTitles = filteredCantos.map(canto => `
                <li data-id="${canto.id}">
                    ${canto.id} - ${canto.titulo}
                    <span class="heart-icon ${favoritos.some(fav => fav.id === canto.id) ? 'favorited' : ''}" data-id="${canto.id}">♥</span>
                    <span class="play-icon" data-id="${canto.id}">▶</span>
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
                        <button id="back-button">◀ REGRESAR</button>
                    `;

                    // Agregar evento de clic al botón de regreso
                    document.getElementById('back-button').addEventListener('click', loadCantos);
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
                    e.stopPropagation();
                });
            });

            // Agregar funcionalidad de presentación a los resultados filtrados
            document.querySelectorAll('.play-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    const cantoId = e.target.getAttribute('data-id');
                    const canto = data.cantos.find(c => c.id === cantoId);
                    if (canto && !presentar.some(p => p.id === cantoId)) {
                        presentar.push(canto);
                        console.log('Canto agregado a la lista de presentación:', canto);
                    }
                    savePresentar();
                    e.stopPropagation(); // Evitar que el clic en el icono cargue el canto
                });
            });
        }

        // Agregar funcionalidad de búsqueda en tiempo real a ambas instancias
        document.getElementById('search-inputMenuBar').addEventListener('input', () => filterCantos('MenuBar'));
        document.getElementById('search-buttonMenuBar').addEventListener('click', () => filterCantos('MenuBar'));
        document.getElementById('search-inputSideMenu').addEventListener('input', () => filterCantos('SideMenu'));
        document.getElementById('search-buttonSideMenu').addEventListener('click', () => filterCantos('SideMenu'));

    } catch (error) {
        console.error('Error loading content:', error);
    }
}

export function loadFavoritos() {
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = ''; // Limpiar el contenido anterior
    contentDiv.className = 'mini-container';
    contentDiv.classList.add('favoritos-content')

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
                <button id="back-button">◀ REGRESAR</button>
            `;

            // Agregar evento de clic al botón de regreso
            document.getElementById('back-button').addEventListener('click', loadFavoritos);
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

export function loadPresentar() {
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = ''; // Limpiar el contenido anterior
    contentDiv.className = 'mini-container';
    contentDiv.classList.add('presentar-content');

    if (presentar.length === 0) {
        contentDiv.innerHTML = '<p>No hay cantos en la lista de presentación.</p>';
        return;
    }

    const titles = presentar.map(canto => `
        <li data-id="${canto.id}">
            ${canto.id} - ${canto.titulo}
            <span class="play-icon" data-id="${canto.id}">▶</span>
        </li>
    `).join('');
    contentDiv.innerHTML = `<ul>${titles}</ul><button id="presentar-button">Iniciar Preventacion</button>`;

    // // Agregar evento de clic a los títulos de presentación
    // document.querySelectorAll('#main-content li').forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         if (e.target.classList.contains('play-icon')) {
    //             return; // Evitar que el clic en el icono de presentación cargue el canto
    //         }
    //         const canto = presentar.find(c => c.id === item.getAttribute('data-id'));
    //         const paragraphs = canto.contenido.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
    //         contentDiv.innerHTML = `
    //             <h2>${canto.titulo}</h2>
    //             ${paragraphs}
    //             <button id="back-button">◀ REGRESAR</button>
    //         `;

    //         // Agregar evento de clic al botón de regreso
    //         document.getElementById('back-button').addEventListener('click', loadPresentar);
    //     });
    // });

    // Agregar funcionalidad de presentación a la lista de presentación
    document.querySelectorAll('.play-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const cantoId = e.target.getAttribute('data-id');
            presentar = presentar.filter(p => p.id !== cantoId);
            savePresentar();
            loadPresentar();
            e.stopPropagation(); // Evitar que el clic en el icono cargue el canto
        });
    });

    // Agregar evento de clic al botón de presentación
    document.getElementById('presentar-button').addEventListener('click', startPresentation);
}

function startPresentation() {
    let currentIndex = 0;
    let isPresentationActive = true;

    const contentDiv = document.getElementById('main-content');
    const menuBar = document.getElementById('menu-bar');
    contentDiv.classList.add('presentation'); // Agregar clase para cambiar estilos
    menuBar.classList.add('hidden'); // Ocultar el menú de navegación

    const showSlide = (index) => {
        if (!isPresentationActive) return;

        const canto = presentar[index];
        const paragraphs = canto.contenido.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
        contentDiv.innerHTML = `
            <div class="presentation-content">
                <h2>${canto.titulo}</h2> 
                ${paragraphs} 
            </div> 
            <div class="container">
                <div class="bird-container bird-container--one">
                    <div class="bird bird--one"></div>
                </div>
                <div class="bird-container bird-container--two">
                    <div class="bird bird--two"></div>
                </div>
                <div class="bird-container bird-container--three">
                    <div class="bird bird--three"></div>
                </div>
                <div class="bird-container bird-container--four">
                    <div class="bird bird--four"></div>
                </div>
            </div>
            <button id="prev-button">◀</button> 
            <button id="next-button">▶</button> 
            <button id="stop-button">✖</button>
        `;

        document.getElementById('next-button').addEventListener('click', nextSlide);
        document.getElementById('prev-button').addEventListener('click', prevSlide);
        document.getElementById('stop-button').addEventListener('click', stopPresentation);

        // Agregar eventos de teclado
        document.addEventListener('keydown', handleKeydown);
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % presentar.length;
        if (currentIndex === 0) {
            contentDiv.innerHTML = `
                <div class="presentation-finished">
                    <p>Presentación finalizada.</p>
                    <button id="volverPrese-button">Volver a lista de presentación</button>
                </div>
            `;
            isPresentationActive = false;
            const volverButton = document.getElementById('volverPrese-button');
            volverButton.addEventListener('click', () => {
                contentDiv.classList.remove('presentation'); // Quitar clase para restaurar estilos
                menuBar.classList.remove('hidden'); // Mostrar el menú de navegación
                loadPresentar();
                document.removeEventListener('keydown', handleKeydown); // Quitar eventos de teclado
            });
            volverButton.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    volverButton.click();
                }
            });
        } else {
            showSlide(currentIndex);
        }
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + presentar.length) % presentar.length;
        showSlide(currentIndex);
    };

    const stopPresentation = () => {
        isPresentationActive = false;
        contentDiv.classList.remove('presentation'); // Quitar clase para restaurar estilos
        menuBar.classList.remove('hidden'); // Mostrar el menú de navegación
        loadPresentar(); // Volver a la lista de presentación inmediatamente
        document.removeEventListener('keydown', handleKeydown); // Quitar eventos de teclado
    };

    const handleKeydown = (event) => {
        if (event.key === 'ArrowRight') {
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'Escape') {
            stopPresentation();
        } else if (event.key === 'Enter' && !isPresentationActive) {
            const volverButton = document.getElementById('volverPrese-button');
            if (volverButton) {
                volverButton.click();
            }
        }
    };

    showSlide(currentIndex);
}
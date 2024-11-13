// Cargar el archivo biblia.json y mostrar el contenido inicial
export async function loadBibleContent() {
    try {
        const response = await fetch('../data/biblia.json'); // Cambia la ruta a donde tengas biblia.json
        if (!response.ok) throw new Error('Network response was not ok');
        const bibleData = await response.json();

        // Mostrar la selección inicial: "Antiguo Testamento" y "Nuevo Testamento"
        displayTestaments(bibleData);
    } catch (error) {
        console.error('Error loading Bible content:', error);
    }
}

function displayTestaments(bibleData) {
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = `
        <h2>Seleccione un Testamento</h2>
        <ul>
            <li data-testament="Antiguo Testamento">Antiguo Testamento</li>
            <li data-testament="Nuevo Testamento">Nuevo Testamento</li>
        </ul>
    `;

    // Agregar eventos para seleccionar cada testamento
    document.querySelectorAll('[data-testament]').forEach(item => {
        item.addEventListener('click', () => {
            const testament = item.getAttribute('data-testament');
            displayGroups(bibleData[testament], testament);
        });
    });
}

function displayGroups(groups, testament) {
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = `<h2>Grupos en ${testament}</h2><ul>${Object.keys(groups).map(group => `<li data-group="${group}">${group}</li>`).join('')}</ul>`;

    // Agregar eventos para seleccionar cada grupo
    document.querySelectorAll('[data-group]').forEach(item => {
        item.addEventListener('click', () => {
            const group = item.getAttribute('data-group');
            displayBooks(groups[group], testament, group);
        });
    });
}

function displayBooks(books, testament, group) {
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = `<h2>Libros en ${group} (${testament})</h2><ul>${books.map(book => `<li data-book="${book.name}" data-chapters="${book.chapters}">${book.name}</li>`).join('')}</ul>`;

    // Agregar eventos para seleccionar cada libro
    document.querySelectorAll('[data-book]').forEach(item => {
        item.addEventListener('click', () => {
            const bookName = item.getAttribute('data-book');
            const chapters = item.getAttribute('data-chapters');
            displayChapters(bookName, chapters);
        });
    });
}

function displayChapters(bookName, chapters) {
    const contentDiv = document.getElementById('main-content');
    const chapterList = Array.from({ length: chapters }, (_, i) => `<li data-chapter="${i + 1}">Capítulo ${i + 1}</li>`).join('');
    contentDiv.innerHTML = `<h2>Capítulos de ${bookName}</h2><ul>${chapterList}</ul>`;

    // Agregar eventos para seleccionar cada capítulo
    document.querySelectorAll('[data-chapter]').forEach(item => {
        item.addEventListener('click', () => {
            const chapter = item.getAttribute('data-chapter');
            fetchVerses(bookName, chapter);
        });
    });
}

async function fetchVerses(bookName, chapter) {
    try {
        const response = await fetch(`https://bible-api.com/${bookName} ${chapter}`);
        if (!response.ok) throw new Error('Error fetching verses');
        const data = await response.json();

        displayVerses(data);
    } catch (error) {
        console.error('Error fetching verses:', error);
    }
}

function displayVerses(data) {
    const contentDiv = document.getElementById('main-content');
    const verses = data.verses.map(verse => `<p><strong>${verse.verse}:</strong> ${verse.text}</p>`).join('');
    contentDiv.innerHTML = `<h2>${data.reference}</h2>${verses}<button id="back-button">◀ Regresar</button>`;

    // Agregar evento para regresar
    document.getElementById('back-button').addEventListener('click', loadBibleContent);
}
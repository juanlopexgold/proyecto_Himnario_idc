export async function loadBibleContent() {
    try {
        const response = await fetch('../data/biblia.json'); // Cambia la ruta según tu estructura
        if (!response.ok) throw new Error('Error al cargar el archivo JSON');
        const bibleData = await response.json();
        initializeUI(bibleData);
    } catch (error) {
        console.error('Error al cargar la Biblia:', error);
    }
}

function initializeUI(bibleData) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpiar contenido inicial

    // Crear menús desplegables dinámicos
    const dropdowns = ['Idioma', 'Versión', 'Testamento', 'Grupo', 'Libro', 'Capítulo', 'Versículo'];
    const dropMenus = createDropMenus(dropdowns);

    // Agregar los menús al DOM
    dropMenus.forEach(menu => mainContent.appendChild(menu.container));

    // Deshabilitar todos los menús excepto el primero
    dropMenus.slice(1).forEach(menu => (menu.select.disabled = true));

    // Rellenar el primer menú con idiomas
    populateSelect(dropMenus[0].select, Object.keys(bibleData));

    // Event listeners para flujo de selección
    dropMenus[0].select.addEventListener('change', () => handleLanguageChange(dropMenus, bibleData));
    dropMenus[1].select.addEventListener('change', () => handleVersionChange(dropMenus, bibleData));
    dropMenus[2].select.addEventListener('change', () => handleTestamentChange(dropMenus, bibleData));
    dropMenus[3].select.addEventListener('change', () => handleGroupChange(dropMenus, bibleData));
    dropMenus[4].select.addEventListener('change', () => handleBookChange(dropMenus));
    dropMenus[5].select.addEventListener('change', () => handleChapterChange(dropMenus));
}

function createDropMenus(names) {
    return names.map(name => {
        const container = document.createElement('div');
        container.innerHTML = `<label>${name}</label>`;
        const select = document.createElement('select');
        select.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';
        container.appendChild(select);
        return { container, select };
    });
}

function populateSelect(select, options) {
    select.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

function handleLanguageChange(dropMenus, bibleData) {
    const language = dropMenus[0].select.value;
    const versionSelect = dropMenus[1].select;
    const versions = {
        Español: ['Reina-Valera', 'NVI', 'NTV', 'DHH', 'TLA'],
        Inglés: ['King James', 'NIV', 'ESV', 'NASB', 'NKJV']
    };

    if (versions[language]) {
        populateSelect(versionSelect, versions[language]);
        versionSelect.disabled = false;
    } else {
        versionSelect.disabled = true;
    }

    resetDropMenus(dropMenus, 1);
}

function handleVersionChange(dropMenus, bibleData) {
    const version = dropMenus[1].select.value;

    if (version === 'King James') {
        dropMenus[2].select.disabled = false;
        populateSelect(dropMenus[2].select, Object.keys(bibleData['Nuevo Testamento']));
    } else {
        // Si no es "King James", mantener los menús desactivados
        resetDropMenus(dropMenus, 2);
    }
}

function handleTestamentChange(dropMenus, bibleData) {
    const testament = dropMenus[2].select.value;
    const language = dropMenus[0].select.value;
    const groupSelect = dropMenus[3].select;

    if (language === 'Inglés') {
        const testamentData = bibleData['Antiguo Testamento'];
        populateSelect(groupSelect, Object.keys(testamentData));
        groupSelect.disabled = false;
    } else {
        resetDropMenus(dropMenus, 3);
    }
}

function handleGroupChange(dropMenus, bibleData) {
    const testament = dropMenus[2].select.value;
    const group = dropMenus[3].select.value;
    const bookSelect = dropMenus[4].select;

    const testamentData = bibleData[testament];
    if (testamentData[group]) {
        const books = testamentData[group];
        populateSelect(
            bookSelect,
            books.map(book => book.name)
        );
        bookSelect.disabled = false;
    } else {
        resetDropMenus(dropMenus, 4);
    }
}

function handleBookChange(dropMenus) {
    const bookName = dropMenus[4].select.value;
    const chapterSelect = dropMenus[5].select;

    const chapters = dropMenus[4].select.selectedOptions[0].dataset.chapters || 0;
    const chapterNumbers = Array.from({ length: chapters }, (_, i) => i + 1);

    populateSelect(chapterSelect, chapterNumbers);
    chapterSelect.disabled = false;
}

function handleChapterChange(dropMenus) {
    const bookName = dropMenus[4].select.value;
    const chapter = dropMenus[5].select.value;

    fetchVerses(bookName, chapter);
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
    const mainContent = document.getElementById('main-content');
    const verses = data.verses.map(verse => `<p><strong>${verse.verse}:</strong> ${verse.text}</p>`).join('');
    mainContent.innerHTML = `<h2>${data.reference}</h2>${verses}<button id="back-button">◀ Regresar</button>`;

    document.getElementById('back-button').addEventListener('click', loadBibleContent);
}

function resetDropMenus(dropMenus, startIndex) {
    for (let i = startIndex; i < dropMenus.length; i++) {
        dropMenus[i].select.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';
        dropMenus[i].select.disabled = true;
    }
}
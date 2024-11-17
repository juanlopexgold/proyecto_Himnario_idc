// Cargar el archivo JSON y configurar la lógica inicial
export async function loadBibleContent() {
    try {
        const response = await fetch('../data/biblia.json'); // Cambia la ruta según tu proyecto
        if (!response.ok) throw new Error('Error al cargar los datos de la Biblia');
        const bibleData = await response.json();

        // Iniciar el flujo con la creación de los menús
        setupBibleUI(bibleData);
    } catch (error) {
        console.error('Error cargando contenido de la Biblia:', error);
    }
}

// Configurar la interfaz de usuario
function setupBibleUI(bibleData) {
    const container = document.getElementById('main-content');
    container.innerHTML = `
        <h2>Explorador de la Biblia</h2>
        <div id="dropdowns-container"></div>
        <div id="content-display"></div>
    `;

    // Crear menús desplegables
    const dropdowns = [
        { id: 'language-select', label: 'Idioma', options: ['Español', 'Inglés'] },
        { id: 'version-select', label: 'Versión', options: [] },
        { id: 'testament-select', label: 'Testamento', options: [] },
        { id: 'group-select', label: 'Grupo', options: [] },
        { id: 'book-select', label: 'Libro', options: [] },
        { id: 'chapter-select', label: 'Capítulo', options: [] },
        { id: 'verse-select', label: 'Versículo', options: [] }
    ];

    const dropdownContainer = document.getElementById('dropdowns-container');
    dropdowns.forEach((dropdown, index) => {
        dropdownContainer.appendChild(createDropMenu(dropdown, index === 0)); // Solo el primero está habilitado al inicio
    });

    // Lógica para manejar las selecciones
    setupEventListeners(bibleData);
}

// Crear un menú desplegable dinámico
function createDropMenu({ id, label, options }, isEnabled) {
    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'dropdown-wrapper';
    selectWrapper.innerHTML = `
        <label for="${id}">${label}:</label>
        <select id="${id}" ${isEnabled ? '' : 'disabled'}>
            <option value="">Seleccione una opción</option>
            ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
        </select>
    `;
    return selectWrapper;
}

// Configurar los eventos de los menús desplegables
function setupEventListeners(bibleData) {
    const languageSelect = document.getElementById('language-select');
    const versionSelect = document.getElementById('version-select');
    const testamentSelect = document.getElementById('testament-select');
    const groupSelect = document.getElementById('group-select');
    const bookSelect = document.getElementById('book-select');
    const chapterSelect = document.getElementById('chapter-select');
    const verseSelect = document.getElementById('verse-select');

    // Idiomas y versiones predeterminadas
    const defaultVersions = {
        Español: ["Reina-Valera", "NVI", "NTV", "DHH", "TLA"],
        Inglés: ["King James", "NIV", "ESV", "NASB", "NKJV"]
    };

    // Selección de idioma
    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        if (selectedLanguage) {
            const versions = defaultVersions[selectedLanguage] || [];
            populateSelect(versionSelect, versions);
            versionSelect.disabled = false;
            resetSelects([testamentSelect, groupSelect, bookSelect, chapterSelect, verseSelect]);
        }
    });

    // Selección de versión
    versionSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        const selectedVersion = versionSelect.value;
        if (selectedVersion) {
            const testaments = Object.keys(bibleData[selectedLanguage][selectedVersion] || {});
            populateSelect(testamentSelect, testaments);
            testamentSelect.disabled = false;
            resetSelects([groupSelect, bookSelect, chapterSelect, verseSelect]);
        }
    });

    // Selección de testamento
    testamentSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        const selectedVersion = versionSelect.value;
        const selectedTestament = testamentSelect.value;
        if (selectedTestament) {
            const groups = Object.keys(bibleData[selectedLanguage][selectedVersion][selectedTestament] || {});
            populateSelect(groupSelect, groups);
            groupSelect.disabled = false;
            resetSelects([bookSelect, chapterSelect, verseSelect]);
        }
    });

    // Selección de grupo
    groupSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        const selectedVersion = versionSelect.value;
        const selectedTestament = testamentSelect.value;
        const selectedGroup = groupSelect.value;
        if (selectedGroup) {
            const books = bibleData[selectedLanguage][selectedVersion][selectedTestament][selectedGroup] || [];
            populateSelect(bookSelect, books.map(book => book.name));
            bookSelect.disabled = false;
            resetSelects([chapterSelect, verseSelect]);
        }
    });

    // Selección de libro
    bookSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        const selectedVersion = versionSelect.value;
        const selectedTestament = testamentSelect.value;
        const selectedGroup = groupSelect.value;
        const selectedBook = bookSelect.value;
        if (selectedBook) {
            const bookData = bibleData[selectedLanguage][selectedVersion][selectedTestament][selectedGroup]
                .find(book => book.name === selectedBook);
            const chapters = Array.from({ length: bookData.chapters }, (_, i) => i + 1);
            populateSelect(chapterSelect, chapters);
            chapterSelect.disabled = false;
            resetSelects([verseSelect]);
        }
    });

    // Mostrar versículos
    chapterSelect.addEventListener('change', async () => {
        const selectedBook = bookSelect.value;
        const selectedChapter = chapterSelect.value;
        if (selectedChapter) {
            await fetchVerses(selectedBook, selectedChapter);
        }
    });
}

// Rellenar un select con opciones
function populateSelect(selectElement, options) {
    selectElement.innerHTML = `
        <option value="">Seleccione una opción</option>
        ${options.map(option => `<option value="${option}">${option}</option>`).join('')}
    `;
    selectElement.disabled = false;
}

// Reiniciar selects posteriores
function resetSelects(selects) {
    selects.forEach(select => {
        select.innerHTML = `<option value="">Seleccione una opción</option>`;
        select.disabled = true;
    });
}

// Obtener y mostrar versículos dinámicamente
async function fetchVerses(bookName, chapter) {
    const contentDisplay = document.getElementById('content-display');
    try {
        const formattedBook = bookName.replace(/ /g, '+');
        const response = await fetch(`https://bible-api.com/${formattedBook}+${chapter}`);
        if (!response.ok) throw new Error('Error al obtener versículos');
        const data = await response.json();
        contentDisplay.innerHTML = `
            <h2>${data.reference}</h2>
            ${data.verses.map(verse => `<p><strong>${verse.verse}:</strong> ${verse.text}</p>`).join('')}
        `;
    } catch (error) {
        console.error('Error al obtener versículos:', error);
        contentDisplay.innerHTML = `<p>Error al cargar los versículos.</p>`;
    }
}
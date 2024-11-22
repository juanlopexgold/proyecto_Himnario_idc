// Cargar opciones iniciales y configurar eventos
export async function loadBibleContent() {
    try {
        // Configurar la interfaz de usuario inicial
        setupBibleUI();
    } catch (error) {
        console.error("Error inicializando el módulo:", error);
    }
}

// JSON de libros y capítulos
const bibleBooks = {
    "Antiguo Testamento": {
        "Pentateuco": [
            { "name": "Genesis", "chapters": 50 },
            { "name": "Exodus", "chapters": 40 },
            { "name": "Leviticus", "chapters": 27 },
            { "name": "Numbers", "chapters": 36 },
            { "name": "Deuteronomy", "chapters": 34 }
        ],
        // ... Agrega el resto del JSON aquí
    },
    "Nuevo Testamento": {
        "Cartas Paulinas": [
            { "name": "Romans", "chapters": 16 },
            { "name": "1 Corinthians", "chapters": 16 },
            { "name": "2 Corinthians", "chapters": 13 },
            { "name": "Galatians", "chapters": 6 },
            { "name": "Ephesians", "chapters": 6 },
            { "name": "Philippians", "chapters": 4 },
            { "name": "Colossians", "chapters": 4 },
            { "name": "1 Thessalonians", "chapters": 5 },
            { "name": "2 Thessalonians", "chapters": 3 },
            { "name": "1 Timothy", "chapters": 6 },
            { "name": "2 Timothy", "chapters": 4 },
            { "name": "Titus", "chapters": 3 },
            { "name": "Philemon", "chapters": 1 }
        ],
        // ... Agrega el resto del JSON aquí
    }
};

// Configurar la interfaz de usuario
function setupBibleUI() {
    const container = document.getElementById("main-content");
    container.classList.add("content_BibleMV");
    container.innerHTML = `
        <h2>Explorador de la Biblia</h2>
        <div id="dropdowns-container"></div>
        <div id="content-display"></div>
    `;

    // Crear menús desplegables
    const dropdowns = [
        { id: "language-select", label: "Idioma", options: ["Español", "Inglés"] },
        { id: "version-select", label: "Versión", options: [] },
        { id: "book-select", label: "Libro", options: [] },
        { id: "chapter-select", label: "Capítulo", options: [] },
        { id: "verse-select", label: "Versículo", options: [] }
    ];

    const dropdownContainer = document.getElementById("dropdowns-container");
    dropdowns.forEach((dropdown, index) => {
        dropdownContainer.appendChild(createDropMenu(dropdown, index === 0)); // Habilitar solo el primer menú
    });

    // Configurar los eventos
    setupEventListeners();
}

// Crear un menú desplegable dinámico
function createDropMenu({ id, label, options }, isEnabled) {
    const selectWrapper = document.createElement("div");
    selectWrapper.className = "dropdown-wrapper";
    selectWrapper.innerHTML = `
        <label for="${id}">${label}:</label>
        <select id="${id}" ${isEnabled ? "" : "disabled"}>
            <option value="" disabled selected>Seleccione una opción</option>
            ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
        </select>
    `;
    return selectWrapper;
}

// Configurar eventos de los menús desplegables
function setupEventListeners() {
    const languageSelect = document.getElementById("language-select");
    const versionSelect = document.getElementById("version-select");
    const bookSelect = document.getElementById("book-select");
    const chapterSelect = document.getElementById("chapter-select");
    const verseSelect = document.getElementById("verse-select");

    // Idiomas y versiones predeterminadas
    const bibleVersions = {
        Español: ["Reina Valera", "Dios Habla Hoy"],
        Inglés: ["King James Version", "American Standard Version"]
    };

    // Selección de idioma
    languageSelect.addEventListener("change", () => {
        const selectedLanguage = languageSelect.value;
        if (selectedLanguage) {
            const versions = bibleVersions[selectedLanguage] || [];
            populateSelect(versionSelect, versions);
            versionSelect.disabled = false;
            resetSelects([bookSelect, chapterSelect, verseSelect]);
        }
    });

    // Selección de versión
    versionSelect.addEventListener("change", () => {
        const selectedVersion = versionSelect.value;
        if (selectedVersion) {
            const books = getBooks(selectedVersion);
            populateSelect(bookSelect, books.map((book) => book.name));
            bookSelect.disabled = false;
            resetSelects([chapterSelect, verseSelect]);
        }
    });

    // Selección de libro
    bookSelect.addEventListener("change", () => {
        const selectedBook = bookSelect.value;
        if (selectedBook) {
            const chapters = getChapters(selectedBook);
            populateSelect(chapterSelect, chapters);
            chapterSelect.disabled = false;
            resetSelects([verseSelect]);
        }
    });

    // Selección de capítulo
    chapterSelect.addEventListener("change", () => {
        const selectedBook = bookSelect.value;
        const selectedChapter = chapterSelect.value;
        if (selectedChapter) {
            fetchVerses(selectedBook, selectedChapter).then((verses) => {
                populateSelect(verseSelect, verses);
                verseSelect.disabled = false;
            });
        }
    });
}

// Obtener libros desde el JSON
function getBooks(version) {
    // Aquí puedes filtrar libros según la versión si es necesario.
    return [...bibleBooks["Antiguo Testamento"].Pentateuco, ...bibleBooks["Nuevo Testamento"]["Cartas Paulinas"]];
}

// Obtener capítulos
function getChapters(bookName) {
    const allBooks = getBooks();
    const book = allBooks.find((b) => b.name === bookName);
    return Array.from({ length: book.chapters }, (_, i) => i + 1);
}

// Obtener versículos
async function fetchVerses(book, chapter) {
    const response = await fetch(`https://bible-api.com/${book}+${chapter}`);
    const data = await response.json();
    return data.verses.map((verse) => `${verse.verse}`);
}

// Rellenar un select con opciones
function populateSelect(selectElement, options) {
    selectElement.innerHTML = `
        <option value="" disabled selected>Seleccione una opción</option>
        ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
    `;
    selectElement.disabled = false;
}

// Reiniciar selects posteriores
function resetSelects(selects) {
    selects.forEach((select) => {
        select.innerHTML = `<option value="">Seleccione una opción</option>`;
        select.disabled = true;
    });
}

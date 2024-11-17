let personalSermons = JSON.parse(localStorage.getItem('personalSermons')) || [];

function savePersonalSermons() {
    localStorage.setItem('personalSermons', JSON.stringify(personalSermons));
}

export async function loadSermons() {
    try {
        const response = await fetch('../data/sermons.json'); // Cambia la ruta a donde tengas biblia.json
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const srmonData = await response.json();
        const contentDiv = document.getElementById('main-content');
        contentDiv.innerHTML = ''; // Limpiar el contenido anterior
        contentDiv.classList.add('content_sermon');

        const titles = srmonData.sermones.map(sermon => {
            if (!sermon || !sermon.id) {
                console.error('Canto inválido:', sermon);
                return '';
            }
            return `
                <li data-id="${sermon.id}">
                    ${sermon.id} - ${sermon.titulo}
                </li>
            `;
        }).join('');
        contentDiv.innerHTML = `<ul>${titles}</ul>`;

        document.querySelectorAll('#main-content li').forEach(item => {
            item.addEventListener('click', () => {
                const sermon = srmonData.sermones.find(s => s.id === item.getAttribute('data-id'));
                const { tema, textoClave, introduccion, desarrollo, conclusion } = sermon.contenido;

                contentDiv.innerHTML = `
                    <h2>${sermon.titulo}</h2>
                    <p><strong>Tema:</strong> ${tema}</p>
                    <p><strong>Texto Clave:</strong> ${textoClave}</p>
                    <p><strong>Introducción:</strong> ${introduccion}</p>
                    <h3>Desarrollo</h3>
                    ${Object.entries(desarrollo).map(([key, value]) => `
                        <p><strong>${key}:</strong> ${value.subpuntoA}, ${value.subpuntoB}</p>
                    `).join('')}
                    <h3>Conclusión</h3>
                    <p><strong>Conclusión A:</strong> ${conclusion.subpuntoA}</p>
                    <p><strong>Conclusión B:</strong> ${conclusion.subpuntoB}</p>
                    <button id="back-button">◀ REGRESAR</button>
                `;

                document.getElementById('back-button').addEventListener('click', loadSermons);
            });
        });

    } catch (error) {
        console.error('Error loading Bible content:', error);
    }
}

export function loadPersonalSermons() {
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = ''; // Limpiar el contenido anterior
    contentDiv.classList.add('personal-sermons-content');

    if (personalSermons.length === 0) {
        contentDiv.innerHTML = '<p>No hay sermones personales aún.</p>';
        return;
    }

    const titles = personalSermons.map(sermon => `
        <li data-id="${sermon.id}">
            ${sermon.titulo}
            <span class="edit-icon" data-id="${sermon.id}">✏️</span>
        </li>
    `).join('');
    contentDiv.innerHTML = `<ul>${titles}</ul>`;

    // Agregar eventos de clic para ver o editar sermones
    document.querySelectorAll('#main-content li').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-icon')) {
                const sermon = personalSermons.find(s => s.id === item.getAttribute('data-id'));
                showSermonForm(sermon);
                return; // Evitar que el clic en el lápiz cargue el sermón
            }
            const sermon = personalSermons.find(s => s.id === item.getAttribute('data-id'));
            const { tema, textoClave, introduccion, desarrollo, conclusion } = sermon.contenido;

            contentDiv.innerHTML = `
                <h2>${sermon.titulo}</h2>
                <p><strong>Tema:</strong> ${tema}</p>
                <p><strong>Texto Clave:</strong> ${textoClave}</p>
                <p><strong>Introducción:</strong> ${introduccion}</p>
                <h3>Desarrollo</h3>
                ${Object.entries(desarrollo).map(([key, value]) => `
                    <p><strong>${key}:</strong> ${value.subpuntoA}, ${value.subpuntoB}</p>
                `).join('')}
                <h3>Conclusión</h3>
                <p><strong>Conclusión A:</strong> ${conclusion.subpuntoA}</p>
                <p><strong>Conclusión B:</strong> ${conclusion.subpuntoB}</p>
                <button id="back-button">◀ REGRESAR</button>
            `;

            document.getElementById('back-button').addEventListener('click', loadPersonalSermons);
        });
    });
}

// function viewSermon(sermon) {
//     const contentDiv = document.getElementById('main-content');

// }

export function showSermonForm(sermon = null) {
    const contentDiv = document.getElementById('main-content');
    const isEditing = sermon !== null;
    const formTitle = isEditing ? 'Editar Sermón Personal' : 'Nuevo Sermón Personal';
    const buttonText = isEditing ? 'Guardar Cambios' : 'Agregar Sermón';

    const id = isEditing ? sermon.id : personalSermons.length ? String(personalSermons.length + 1).padStart(4, '0') : '0001';
    const defaultContent = {
        tema: "Tema predeterminado",
        textoClave: "Texto clave predeterminado",
        introduccion: "Introducción predeterminada",
        desarrollo: {
            punto1: { subpuntoA: "Contenido A1", subpuntoB: "Contenido B1" },
            punto2: { subpuntoA: "Contenido A2", subpuntoB: "Contenido B2" },
            punto3: { subpuntoA: "Contenido A3", subpuntoB: "Contenido B3" }
        },
        conclusion: { subpuntoA: "Conclusión A", subpuntoB: "Conclusión B" }
    };
    const contenido = isEditing ? sermon.contenido : defaultContent;

    contentDiv.innerHTML = `
        <h2>${formTitle}</h2>
        <form id="sermon-form">
            <input type="hidden" id="sermon-id" value="${id}">
            <label for="sermon-titulo">Título:</label>
            <input type="text" id="sermon-titulo" value="${sermon ? sermon.titulo : ''}" required>
            <label for="sermon-tema">Tema:</label>
            <input type="text" id="sermon-tema" value="${contenido.tema}" required>
            <label for="sermon-textoClave">Texto Clave:</label>
            <input type="text" id="sermon-textoClave" value="${contenido.textoClave}" required>
            <label for="sermon-introduccion">Introducción:</label>
            <textarea id="sermon-introduccion" required>${contenido.introduccion}</textarea>

            <h3>Desarrollo</h3>
            ${Object.entries(contenido.desarrollo).map(([key, value]) => `
                <label for="${key}">${key}:</label>
                <input type="text" id="${key}-a" value="${value.subpuntoA}" required>
                <input type="text" id="${key}-b" value="${value.subpuntoB}" required>
            `).join('')}

            <h3>Conclusión</h3>
            <label for="conclusionA">Conclusión A:</label>
            <textarea id="conclusionA" required>${contenido.conclusion.subpuntoA}</textarea>
            <label for="conclusionB">Conclusión B:</label>
            <textarea id="conclusionB" required>${contenido.conclusion.subpuntoB}</textarea>

            <button type="submit">${buttonText}</button>
        </form>
        <button id="back-button">◀ REGRESAR</button>
    `;

    document.getElementById('sermon-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('sermon-id').value;
        const titulo = document.getElementById('sermon-titulo').value;
        const tema = document.getElementById('sermon-tema').value;
        const textoClave = document.getElementById('sermon-textoClave').value;
        const introduccion = document.getElementById('sermon-introduccion').value;
        const desarrollo = {
            punto1: { subpuntoA: document.getElementById('punto1-a').value, subpuntoB: document.getElementById('punto1-b').value },
            punto2: { subpuntoA: document.getElementById('punto2-a').value, subpuntoB: document.getElementById('punto2-b').value },
            punto3: { subpuntoA: document.getElementById('punto3-a').value, subpuntoB: document.getElementById('punto3-b').value }
        };
        const conclusion = {
            subpuntoA: document.getElementById('conclusionA').value,
            subpuntoB: document.getElementById('conclusionB').value
        };

        const sermonData = { id, titulo, contenido: { tema, textoClave, introduccion, desarrollo, conclusion } };

        if (isEditing) {
            const index = personalSermons.findIndex(s => s.id === id);
            personalSermons[index] = sermonData;
        } else {
            personalSermons.push(sermonData);
        }

        savePersonalSermons();
        loadPersonalSermons();
    });

    document.getElementById('back-button').addEventListener('click', loadPersonalSermons);
}
export function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    // Cerrar el modal al hacer clic en el botón de cerrar
    modal.querySelector('.modal-close').addEventListener('click', () => {
        closeModal(modal);
    });

    // Cerrar el modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    return modal;
}

function closeModal(modal) {
    document.body.removeChild(modal); // Eliminar el modal del DOM
    location.hash = '#/'; // Redirigir al inicio
}
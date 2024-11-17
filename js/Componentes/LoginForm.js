import { createModal } from './Modal.js';

export function showLoginForm() {
    const content = `
        <h2>Iniciar Sesión</h2>
        <form id="login-form">
            <label for="username">Usuario</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
    `;

    const modal = createModal(content);
    document.body.appendChild(modal);

    // Agregar manejo del formulario
    const form = modal.querySelector('#login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Procesar inicio de sesión...');
        // Aquí puedes implementar el manejo de inicio de sesión
        document.body.removeChild(modal); // Cerrar el modal
    });
}
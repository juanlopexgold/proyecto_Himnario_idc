import { createModal } from './Modal.js';

export function showRegisterForm() {
    const content = `
        <h2>Registrarse</h2>
        <form id="register-form">
            <label for="username">Usuario</label>
            <input type="text" id="username" name="username" required>
            <label for="email">Correo</label>
            <input type="email" id="email" name="email" required>
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Registrarse</button>
        </form>
    `;

    const modal = createModal(content);
    document.body.appendChild(modal);

    // Agregar manejo del formulario
    const form = modal.querySelector('#register-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Procesar registro...');
        // Aquí puedes implementar el manejo de registro
        document.body.removeChild(modal); // Cerrar el modal
    });
}
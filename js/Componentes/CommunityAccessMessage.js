import { createModal } from './Modal.js';
import { showLoginForm } from './LoginForm.js';
import { showRegisterForm } from './RegisterForm.js';

export function showCommunityAccessMessage() {
    const content = `
        <h2>Para ver el contenido de la comunidad debes registrarte o iniciar sesión</h2>
        <p>¿Quieres iniciar sesión? <button id="login-button">Iniciar sesión</button></p>
        <p>¿No te has registrado? <button id="register-button">Registrarse</button></p>
    `;

    const modal = createModal(content);
    document.body.appendChild(modal);

    // Agregar eventos a los botones
    modal.querySelector('#login-button').addEventListener('click', () => {
        document.body.removeChild(modal); // Cerrar el modal actual
        showLoginForm();
    });

    modal.querySelector('#register-button').addEventListener('click', () => {
        document.body.removeChild(modal); // Cerrar el modal actual
        showRegisterForm();
    });
}
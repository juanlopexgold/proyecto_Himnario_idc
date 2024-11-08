export function showWelcomeMessage() {
    const contentDiv = document.createElement('div');
    contentDiv.id = 'welcome-content';
    contentDiv.innerHTML = `
        <h1>Bienvenidos a tu aplicación de cantos</h1>
        <p class="welcome-message">Por que de tal manera amo dios al mundo que ha dado a su hijo unigenito para que todo aquel que en el crea no se pierda mas tenga vida eterna.</p>
    `;
    return contentDiv;
}
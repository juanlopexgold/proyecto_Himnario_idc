import { addTooltip } from './tooltips.js';

export function loadContact() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
      <h2>Contacto</h2>
      <div class="contact-info">
        <img src="img/profile.jpg" alt="Foto de Perfil" class="profile-pic">
        <p><strong>Nombre:</strong> Juan López</p>
        <p><strong><img src="img/whatsapp.png" alt="Facebook"> WhatsApp:</strong> +505 8149 3176</p>
        <p><strong>Correo Electrónico:</strong> juannicolopezgold@gmail.com</p>
        <div class="social-links">
          <a href="https://www.facebook.com/profile.php?id=61565986310624" target="_blank" id="facebook-icon">
            <img src="img/facebook.png" alt="Facebook">
          </a>
          <a href="https://www.instagram.com/juannicolaslopezbaltodano/?hl=es" target="_blank" id="instagram-icon">
            <img src="img/instagram.png" alt="Instagram">
          </a>
          <a href="https://www.linkedin.com/in/juan-nico-baltodano-a26377336/" target="_blank" id="linkedin-icon">
            <img src="img/linkedin.png" alt="LinkedIn">
          </a>
          <a href="https://github.com/juanlopexgold" target="_blank" id="github-icon">
            <img src="img/github.png" alt="GitHub">
          </a>
        </div>
        <h3>Proyectos</h3>
        <ul>
          <li><a href="https://www.tuproyecto1.com" target="_blank">My Personal Blog</a></li>
          </ul>
          </div>
          `;
    // <li><a href="https://www.tuproyecto2.com" target="_blank">Proyecto 2</a></li>
    // <li><a href="https://www.tuproyecto3.com" target="_blank">Proyecto 3</a></li>

    // Añadir tooltips a los iconos de las redes sociales
    addTooltip(document.getElementById('facebook-icon'), 'Síguenos en Facebook');
    addTooltip(document.getElementById('instagram-icon'), 'Síguenos en Instagram');
    addTooltip(document.getElementById('linkedin-icon'), 'Conéctate en LinkedIn');
    addTooltip(document.getElementById('github-icon'), 'Visita nuestro repositorio en GitHub');
}
export function MenuItems() {
  const menuItems = document.createElement('nav');
  menuItems.className = 'menu-items';
  menuItems.innerHTML = `
        <div class="dropdown">
          <p>Himnario</p>
          <div class="dropdown-content">
            <a href="#cantos">Himnario Completo</a>
            <a href="#favoritos">Cantos Favoritos</a>
            <a href="#precentacion">Lista de Precentacion</a>
            <div class="dropdown">
              <p>Cantos Personales</p>
              <div class="dropdown-content">
                <a href="#lista-personales">Tus cantos Personales</a>
                <a href="#nuevo-canto">Agregar nuevo canto</a>
              </div>
            </div>
            <a href="#ComnunidadCantos">Cantos de la Comunidad</a>
          </div>
        </div>
        <div class="dropdown">
          <p>Biblia</p>
          <div class="dropdown-content">
            <a href="#biblia">Biblia MiltiVersion</a>
            <a href="#favoritosBiblia">Textos Favoritos</a>
            <a href="#bibliaPresentar">Textos de Precentacion</a>
          </div>
        </div>
        <div class="dropdown">
          <p>Sermones</p>
          <div class="dropdown-content">
            <a href="#sermones">Sermones De Ejemplo</a>
            <div class="dropdown">
              <p>Sermones Personales</p>
              <div class="dropdown-content">
                <a href="#lista-sermones-personales">Tus sermones Personales</a>
                <a href="#nuevo-sermon">Agregar nuevo sermon</a>
              </div>
            </div>
            <a href="#ComnunidadSermones">Sermones de la Comunidad</a>
          </div>
        </div>
        <div class="dropdown">
          <p>Otras Opciones</p>
          <div class="dropdown-content">
            <a href="#comentarios">Comentarios</a>
            <a href="#conocenos">Conocenos</a>
            <a href="#contacto">Desarrollador</a>
          </div>
        </div>
    `;

  // Agregar eventos de clic a los dropdowns
  const dropdowns = menuItems.querySelectorAll('.dropdown > p');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdownContent = dropdown.nextElementSibling;
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Agregar eventos de clic a cada enlace
  const links = menuItems.querySelectorAll('a');
  links.forEach(link => {
      link.addEventListener('click', () => {
          const sideMenu = document.querySelector('.side-menu');
          const burgerMenu = document.querySelector('.burger-menu');

          sideMenu.classList.remove('show');
          burgerMenu.classList.remove('open');

          // Cerrar cualquier modal abierto
          const existingModal = document.querySelector('.modal');
          if (existingModal) {
              document.body.removeChild(existingModal);
          }
      });
  });

  return menuItems;
}
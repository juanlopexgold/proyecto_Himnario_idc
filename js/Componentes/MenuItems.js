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
            <a href="#ComnunidadCantos">Cantos de la Comunidad</a>
            <div class="dropdown">
              <p>Cantos Personales</p>
              <div class="dropdown-content">
                <a href="#lista-personales">Lista de cantos Personales</a>
                <a href="#nuevo-editar">Nuevo o Editar</a>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown">
          <p>Biblia</p>
          <div class="dropdown-content">
            <a href="#biblia">Biblia MiltiVersion</a>
            <a href="#favoritosBiblia">Textos Favoritos</a>
            <a href="#precentacionBiblia">Textos de Precentacion</a>
          </div>
        </div>
        <div class="dropdown">
          <p>Sermones</p>
          <div class="dropdown-content">
            <a href="#nuevo-editar">Sermones De Ejemplo</a>
            <a href="#nuevo-editar">Sermones de la Comunidad</a>
            <div class="dropdown">
              <p>Sermones Personales</p>
              <div class="dropdown-content">
                <a href="#lista-personales">Lista de sermones Personales</a>
                <a href="#nuevo-editar">Nuevo o Editar</a>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown">
          <p>Otras Opciones</p>
          <div class="dropdown-content">
            <a href="#comentarios">Comentarios</a>
            <a href="#cofiguracion">Cofiguraciones</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
    `;;

  // Agregar eventos de clic a cada enlace
  const links = menuItems.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      const sideMenu = document.querySelector('.side-menu');
      const burgerMenu = document.querySelector('.burger-menu');

      sideMenu.classList.remove('show');
      burgerMenu.classList.remove('open');
    });
  });

  const burgerMenu = document.querySelector('.burger-menu')
  return menuItems;
}
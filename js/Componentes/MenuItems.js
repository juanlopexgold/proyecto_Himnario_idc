export function MenuItems() {
  const menuItems = document.createElement('nav');
  menuItems.className = 'menu-items';
  menuItems.innerHTML = `
        <div class="dropdown">
          <p>Opciones</p>
          <div class="dropdown-content">
            <a href="#cantos">Cantos</a>
            <a href="#biblia">Biblia</a>
          </div>
        </div>
        <div class="dropdown">
          <p>Listas</p>
          <div class="dropdown-content">
            <a href="#favoritos">Favoritos</a>
            <a href="#precentacion">Precentacion</a>
          </div>
        </div>
        <div class="dropdown">
          <p>Personales</p>
          <div class="dropdown-content">
            <a href="#lista-personales">Lista Personales</a>
            <a href="#nuevo-editar">Nuevo o Editar</a>
          </div>
        </div>
        <div class="dropdown">
          <p>Información</p>
          <div class="dropdown-content">
            <a href="#contacto">Contacto</a>
            <a href="#comentarios">Comentarios</a>
            <a href="#cofiguracion">Cofiguraciones</a>
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
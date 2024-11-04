export function createMenuBar() {
    const menuBar = document.createElement('header');
    menuBar.id = 'menu-bar';
  
    const logo = document.createElement('a');
    logo.className = 'logo';
    logo.textContent = 'HIMNARIO';
    logo.href = '#home';
  
    const menuItems = document.createElement('nav');
    menuItems.className = 'menu-items';
    menuItems.innerHTML = `
        <a href="#cantos">Cantos</a>
        <a href="#favoritos">Favoritos</a>
        <div class="dropdown">
          <a href="#personales">Personales</a>
          <div class="dropdown-content">
            <a href="#lista-personales">Lista Personales</a>
            <a href="#nuevo-editar">Nuevo o Editar</a>
          </div>
        </div>
        <div class="dropdown">
          <a href="#informacion">Información</a>
          <div class="dropdown-content">
            <a href="#contacto">Contacto</a>
            <a href="#comentarios">Comentarios</a>
          </div>
        </div>
    `;
  
    const search = document.createElement('div');
    search.className = 'search';
    search.innerHTML = `
        <select id="search-type" disabled>
          <option value="numero">Buscar por número</option>
          <option value="nombre">Buscar por nombre</option>
        </select>
        <div class="search-box" disabled>
          <i id="search-button" disabled>🔍</i>
          <input type="search" id="search-input" placeholder="Buscar..." disabled>
        </div>
    `;
  
    const burgerMenu = document.createElement('div');
    burgerMenu.className = 'burger-menu';
    burgerMenu.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
  
    const sideMenu = document.createElement('div');
    sideMenu.className = 'side-menu';
    sideMenu.innerHTML = `
      <a href="#cantos">Cantos</a>
      <a href="#favoritos">Favoritos</a>
      <div class="dropdown">
        <a href="#personales">Personales</a>
        <div class="dropdown-content">
          <a href="#lista-personales">Lista Personales</a>
          <a href="#nuevo-editar">Nuevo o Editar</a>
        </div>
      </div>
      <div class="dropdown">
        <a href="#informacion">Información</a>
        <div class="dropdown-content">
          <a href="#contacto">Contacto</a>
          <a href="#comentarios">Comentarios</a>
        </div>
      </div>
      <div class="search">
        <select id="side-search-type" disabled>
          <option value="numero">Buscar por número</option>
          <option value="nombre">Buscar por nombre</option>
        </select>
        <input type="text" id="side-search-input" placeholder="Buscar..." disabled>
        <button id="side-search-button" disabled>Buscar</button>
      </div>
    `;
  
    menuBar.appendChild(logo);
    menuBar.appendChild(menuItems);
    menuBar.appendChild(search);
    menuBar.appendChild(burgerMenu);
    document.body.appendChild(sideMenu);
  
    // Añadir evento de clic al menú hamburguesa
    burgerMenu.addEventListener('click', () => {
      sideMenu.classList.toggle('show');
    });
  
    return menuBar;
  }  
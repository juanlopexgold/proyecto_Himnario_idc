import { Logo } from "./Logo.js";
import { MenuItems } from "./MenuItems.js";
import { Search } from "./Search.js";

export function Header() {
    const menuBar = document.createElement('header');
    menuBar.id = 'menu-bar';

    const burgerMenu = document.createElement('div');
    burgerMenu.className = 'burger-menu';
    burgerMenu.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    const iconos_opcion = document.createElement('div');
    iconos_opcion.className = 'icon-container';
    iconos_opcion.classList.add('dropdown-config');
    iconos_opcion.innerHTML = `
        <i id="config-icon">🛠</i>
        <div class="dropdown-content-config">
            <a href="#" id="user-icon">Iniciar sesión</a>
            <a href="#" id="toggle-theme">Cambiar a tema oscuro</a>
            <a href="#" id="customize-background">Personalizar fondo</a>
            <a href="#" id="change-font-size">Cambiar tamaño de letra</a>
        </div>
    `;


    // const icono_drop = document.getElementById('config-icon');
    // const drop_contrnt = document.querySelector('.dropdown-content-config');

    // icono_drop.addEventListener('click', () => {
    //     drop_contrnt.classList.toggle('collapsed');
    // });

    const sideMenu = document.createElement('div');
    sideMenu.className = 'side-menu';
    sideMenu.appendChild(MenuItems());
    sideMenu.appendChild(Search('SideMenu'));

    menuBar.appendChild(Logo());
    menuBar.appendChild(MenuItems());
    menuBar.appendChild(Search('MenuBar'));
    menuBar.appendChild(iconos_opcion);
    menuBar.appendChild(burgerMenu);
    document.body.appendChild(sideMenu);

    // Añadir evento de clic al menú hamburguesa
    burgerMenu.addEventListener('click', () => {
        sideMenu.classList.toggle('show');
        burgerMenu.classList.toggle('open');
    });

    return menuBar;
}  
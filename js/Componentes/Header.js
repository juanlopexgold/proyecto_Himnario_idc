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

    const sideMenu = document.createElement('div');
    sideMenu.className = 'side-menu';
    sideMenu.appendChild(MenuItems());
    sideMenu.appendChild(Search('SideMenu'));

    menuBar.appendChild(Logo());
    menuBar.appendChild(MenuItems());
    menuBar.appendChild(Search('MenuBar'));
    menuBar.appendChild(burgerMenu);
    document.body.appendChild(sideMenu);

    // Añadir evento de clic al menú hamburguesa
    burgerMenu.addEventListener('click', () => {
        sideMenu.classList.toggle('show');
        burgerMenu.classList.toggle('open');
    });

    return menuBar;
}  
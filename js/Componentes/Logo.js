export function Logo() {
    const logo = document.createElement('a');
    logo.className = 'logo';
    logo.textContent = 'HIMNARIO';
    logo.href = '#/';

    logo.addEventListener('click', (e) => {
        e.preventDefault();
        location.hash = '#/';

        const sideMenu = document.querySelector('.side-menu');
        const burgerMenu = document.querySelector('.burger-menu');

        burgerMenu.classList.remove('open');
        sideMenu.classList.remove('show');
    });

    return logo;
}
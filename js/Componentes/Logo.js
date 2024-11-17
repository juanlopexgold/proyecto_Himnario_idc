export function Logo() {
    const logo = document.createElement('a');
    logo.className = 'logo';
    logo.href = '#/';
    logo.innerHTML = `
        IDC<span class="tool">🛠️</span><span>TOOLS</span>
    `;



    // const burgerMenu = document.createElement('div');
    // burgerMenu.className = 'burger-menu';
    // burgerMenu.innerHTML = `
    //     <span></span>
    //     <span></span>
    //     <span></span>
    // `;

    // <a href="" class="logo">IDC<span class="tool">🛠️</span><span>TOOLS</span></a>


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
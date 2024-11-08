export function Logo() {
    const logo = document.createElement('a');
    logo.className = 'logo';
    logo.textContent = 'HIMNARIO';
    logo.href = '#/';

    logo.addEventListener('click', (e) => {
        e.preventDefault();
        location.hash = '#/';
    });

    return logo;
}
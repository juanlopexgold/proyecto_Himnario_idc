// // let favoritos = JSON.parse(localStorage.getItem('./favoritos')) || [];

// // function saveFavoritos() {
// //     localStorage.setItem('favoritos', JSON.stringify(favoritos));
// // }

// let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// function saveFavoritos() {
//     localStorage.setItem('favoritos', JSON.stringify(favoritos));
// }

// export function toggleFavorito(canto) {
//     const index = favoritos.findIndex(fav => fav.id === canto.id);
//     if (index !== -1) {
//         favoritos.splice(index, 1);
//     } else {
//         favoritos.push(canto);
//     }
//     saveFavoritos();
// }

// export function isFavorito(cantoId) {
//     return favoritos.some(fav => fav.id === cantoId);
// }

// export function loadFavoritos() {
//     const contentDiv = document.getElementById('content');
//     if (favoritos.length === 0) {
//         contentDiv.innerHTML = '<p>No hay favoritos aún.</p>';
//         return;
//     }

//     const titles = favoritos.map(canto => `
//     <li data-id="${canto.id}">
//       ${canto.id} - ${canto.titulo}
//       <span class="heart-icon favorited" data-id="${canto.id}">♥</span>
//     </li>
//   `).join('');
//     contentDiv.innerHTML = `<ul>${titles}</ul>`;

//     // Agregar evento de clic a los títulos de favoritos
//     document.querySelectorAll('#content li').forEach(item => {
//         item.addEventListener('click', (e) => {
//             if (e.target.classList.contains('heart-icon')) {
//                 return; // Evitar que el clic en el corazón cargue el canto
//             }
//             const canto = favoritos.find(c => c.id === item.getAttribute('data-id'));
//             const paragraphs = canto.contenido.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
//             contentDiv.innerHTML = `
//         <h2>${canto.titulo}</h2>
//         ${paragraphs}
//         <button id="back-button">Volver a la lista de favoritos</button>
//       `;

//             // Agregar evento de clic al botón de regreso
//             document.getElementById('back-button').addEventListener('click', loadFavoritos);
//         });
//     });

//     // Agregar funcionalidad de favoritos a la lista de favoritos
//     document.querySelectorAll('.heart-icon').forEach(icon => {
//         icon.addEventListener('click', (e) => {
//             const cantoId = e.target.getAttribute('data-id');
//             favoritos = favoritos.filter(fav => fav.id !== cantoId);
//             saveFavoritos();
//             loadFavoritos();
//             e.stopPropagation(); // Evitar que el clic en el corazón cargue el canto
//         });
//     });
// }
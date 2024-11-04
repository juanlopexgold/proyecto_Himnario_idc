let comments = JSON.parse(localStorage.getItem('comments')) || [];

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

export function loadComments() {
    const contentDiv = document.getElementById('content');
    const commentsDiv = document.createElement('div');
    if (comments.length === 0) {
        commentsDiv.innerHTML = `<h2>Comentario de usuarios: </h2>
        <p>No hay comentarios aún.</p>`;
    } else {
        const commentList = comments.slice(-5).map(comment => `
          
      <div class="comment">
        <h3>Comentario de usuarios: </h3>  
        <p><strong>${comment.name}</strong> (${comment.rating}/5):</p>
        <p>${comment.text}</p>
      </div>
    `).join('');
        commentsDiv.innerHTML = `<div>${commentList}</div>`;
    }
    contentDiv.appendChild(commentsDiv);
}

export function showCommentForm() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
    <h2>Dejar un Comentario</h2>
    <form id="comment-form">
      <label for="comment-name">Nombre:</label>
      <input type="text" id="comment-name" required>
      <label for="comment-rating">Clasificación:</label>
      <select id="comment-rating" required>
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>
      <label for="comment-text">Comentario:</label>
      <textarea id="comment-text" required></textarea>
      <button type="submit">Enviar</button>
    </form>
    <button id="back-button">Volver</button>
  `;

    document.getElementById('comment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('comment-name').value;
        const rating = document.getElementById('comment-rating').value;
        const text = document.getElementById('comment-text').value;

        comments.push({ name, rating, text });
        saveComments();
        loadComments();
    });

    document.getElementById('back-button').addEventListener('click', loadComments);
}
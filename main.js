const searchBtn = document.getElementById('searchBtn');
const postIdInput = document.getElementById('postId');
const postContainer = document.getElementById('postContainer');

searchBtn.addEventListener('click', () => {
  const postId = parseInt(postIdInput.value);
  if (isNaN(postId) || postId < 1 || postId > 100) {
    alert('Будь ласка, введіть коректний ID поста (від 1 до 100).');
    return;
  }

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Помилка при завантаженні поста. Спробуйте ще раз.');
      }
      return response.json();
    })
    .then(post => {
      postContainer.innerHTML = `
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Пост #${post.id}</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">${post.title}</p>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Користувач ID</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">${post.userId}</dd>
              </div>
            </dl>
          </div>
        </div>
        <button id="commentsBtn" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Отримати коментарі</button>
        <div id="commentsContainer" class="mt-4"></div>
      `;

      const commentsBtn = document.getElementById('commentsBtn');
      const commentsContainer = document.getElementById('commentsContainer');

      commentsBtn.addEventListener('click', () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Помилка при завантаженні коментарів. Спробуйте ще раз.');
            }
            return response.json();
          })
          .then(comments => {
            let commentsHTML = '<h3 class="text-lg font-medium leading-6 text-gray-900">Коментарі</h3>';
            comments.forEach(comment => {
              commentsHTML += `
                <div class="bg-white shadow overflow-hidden sm:rounded-lg mt-2">
                  <div class="px-4 py-5 sm:px-6">
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">${comment.name}</p>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">${comment.email}</p>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">${comment.body}</p>
                  </div>
                </div>
              `;
            });
            commentsContainer.innerHTML = commentsHTML;
          })
          .catch(error => {
            commentsContainer.innerHTML = `<p class="text-red-500">${error.message}</p>`;
          });
      });
    })
    .catch(error => {
      postContainer.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    });
});

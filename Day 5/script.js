const blogForm = document.getElementById('blogForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postIdInput = document.getElementById('postId');
const postsContainer = document.getElementById('posts');

function getPosts() {
  return JSON.parse(localStorage.getItem('blogs') || '[]');
}

function savePosts(posts) {
  localStorage.setItem('blogs', JSON.stringify(posts));
}

function renderPosts() {
  postsContainer.innerHTML = '';
  const posts = getPosts();
  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="actions">
        <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
        <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
      </div>
    `;
    postsContainer.appendChild(postDiv);
  });
}

blogForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const id = postIdInput.value;

  if (!title || !content) return;

  let posts = getPosts();

  if (id) {
    posts = posts.map(post => post.id === parseInt(id) ? { id: post.id, title, content } : post);
  } else {
    const newPost = {
      id: Date.now(),
      title,
      content
    };
    posts.push(newPost);
  }

  savePosts(posts);
  renderPosts();
  blogForm.reset();
  postIdInput.value = '';
});

function editPost(id) {
  const post = getPosts().find(p => p.id === id);
  if (post) {
    titleInput.value = post.title;
    contentInput.value = post.content;
    postIdInput.value = post.id;
  }
}

function deletePost(id) {
  let posts = getPosts().filter(p => p.id !== id);
  savePosts(posts);
  renderPosts();
}

renderPosts();
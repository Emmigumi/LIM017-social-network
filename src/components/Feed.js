import { saveTask, onGetTask } from '../Firebase/firestore.js';

/* import { createElements } from '../util.js';
import { store } from '../Firebase/firestore.js';

export const Feed = () => {
  const userId = sessionStorage.getItem('uid');

  // getPost(userId).then(() => {
  const feedDivWrapper = document.createElement('div');
  feedDivWrapper.id = 'feedWrapper';
  feedDivWrapper.className = 'feed-wrapper';

  const logoFeed = document.createElement('img');
  logoFeed.src = 'imagenes/logo.png';
  logoFeed.id = 'feed-logo';
  logoFeed.className = 'logo';

  feedDivWrapper.appendChild(logoFeed);

  // Boton para publicar un nuevo postDiv

  const btnNewPost = document.createElement('button');
  btnNewPost.textContent = 'Crear nueva publicación';

  feedDivWrapper.appendChild(btnNewPost);

  // boton con addeventlistener
  // formulario para crear una nueva publicacion
  const newPostForm = document.createElement('form');
  newPostForm.classList.add('hide');
  const newPostTitle = document.createElement('input');
  newPostTitle.placeholder = 'coloca el titulo de tu publicación';
  const newPostBody = document.createElement('textarea');
  newPostBody.placeholder = 'escribe tu publicación';
  const btnPublish = document.createElement('button');
  btnPublish.setAttribute('type', 'submit');
  btnPublish.textContent = 'Publicar';

  newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    store({ title: newPostTitle.value, body: newPostBody.value, userId }, 'publicaciones');
  });

  newPostForm.append(newPostTitle, newPostBody, btnPublish);

  feedDivWrapper.appendChild(newPostForm);

  // funcion para el boton
  btnNewPost.addEventListener('click', () => {
    newPostForm.classList.remove('hide');
  });

  const [
    postDiv,
    userInfoDiv,
    textPost,

    interactionDiv,
  ] = createElements(
    'div',
    'div',
    'textarea',
    'div',
  );

  postDiv.id = 'post-container';
  postDiv.className = 'test';

  // Div info user
  userInfoDiv.id = 'user-info-container';
  userInfoDiv.className = 'test';

  // div text post
  textPost.id = 'post-text';
  textPost.name = 'post-text';
  textPost.className = 'test';
  textPost.placeholder = 'Prueba prueba';

  interactionDiv.className = 'test1';
  interactionDiv.id = 'interaction';

  const [
    userImg,
    userName,
    likeDiv,
    favDiv,
  ] = createElements(
    'img',
    'h4',
    'div',
    'div',
  );

  userImg.id = 'user-image-profile';
  userImg.src = 'imagenes/goose-pf.jpg';

  userName.id = 'user-name';
  userName.textContent = sessionStorage.getItem('username');

  likeDiv.id = 'like-container';
  likeDiv.className = 'test';

  favDiv.id = 'fav-container';
  favDiv.className = 'test';

  const [
    btnLike,
    btnDislike,
    btnFav,
  ] = createElements('button', 'button', 'button');

  btnLike.textContent = 'Like';
  btnDislike.textContent = 'Dislike';

  btnFav.id = 'btn-fav';
  btnFav.textContent = 'Patita';

  likeDiv.append(btnLike, btnDislike);
  favDiv.appendChild(btnFav);
  userInfoDiv.append(userImg, userName);
  interactionDiv.append(likeDiv, favDiv);

  feedDivWrapper.append(
    postDiv,
    userInfoDiv,
    textPost,
    interactionDiv,
  );
  // });
  return feedDivWrapper;
};
 */

export const Feed = () => {
  const feedDiv = document.createElement('div');
  feedDiv.id = 'conteiner-post';

  const feedTemplate = `<form id="task-form">
  <label for="title">Title</label>
  <input type="text" placeholder="task-title" id="task-title">
  <label for="description">Descriptions</label>
  <textarea id="task-description" rows="3" placeholder="task-description"></textarea>
<button id="btn-task-save">Save</button>
</form>`;
  feedDiv.innerHTML += feedTemplate;

  const taskForm = feedDiv.querySelector('#task-form');
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskForm['task-title'];
    const description = taskForm['task-description'];
    saveTask(title.value, description.value);
    taskForm.reset();
  });

  const taskContent = document.createElement('div');
  taskContent.id = 'task-content';
  taskContent.className = 'task-content-class';
  console.log('taskContent', taskContent);

  onGetTask((querySnapshot) => {
    let html = '';
    console.log('html', html);
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      console.log('task', task);
      html += `<div>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      </div>`;
    });
    taskContent.innerHTML = html;
    console.log(taskContent.innerHTML);
  });
  const callDivGlobal = feedDiv.querySelector('#task-form');
  callDivGlobal.insertAdjacentElement('beforeend', taskContent);

  return feedDiv;
};

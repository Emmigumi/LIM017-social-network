/* eslint-disable no-unused-vars */
import {
  store, onGetPostInRealTime, deletePost, getSinglePost, updatePost,
} from '../Firebase/firestore.js';

export const Feed = () => {
  const userId = sessionStorage.getItem('uid');

  const feedWrapper = document.createElement('div');
  const templateFeed = `
  <section id="feed" class= "contenedor-section">

  <img id="feed-logo" class="logo" src="imagenes/logo.png">

  <div id="createNewPost">
    <p> Hola ${sessionStorage.getItem('username')}</p>
    <button id="btnNewPost" class="btn-new"> Crear Nueva Publicación </button>
  </div>

  <form id = "formNewPost" class = "hide">
    <input type = "text" id ="newPostTitle" class = "newPostTitle" placeholder = "coloca el título de tu publicación" value= "">

    <input type = "text" id ="newPostBody" class="newPostBody" placeholder = "Escribe tu publicacion" value="">

    <button type = "submit" id = "publishBtn" value="Publish"> Publicar </button>
  </form>
  
  <div id='feedPost1'></div>

  `;

  feedWrapper.innerHTML += templateFeed;

  const formNewPost = feedWrapper.querySelector('#formNewPost');
  const postNew = feedWrapper.querySelector('.btn-new');

  postNew.addEventListener('click', () => {
    formNewPost.classList.remove('hide');
  });

  // Cuadros de texto rellenables
  const newPostTitle = feedWrapper.querySelector('#newPostTitle');
  const newPostBody = feedWrapper.querySelector('#newPostBody');
  // variable que me indica el estado de edición
  let editStatus = false;
  let id = '';

  const feedPostWrapper = feedWrapper.querySelector('#feedPost1');
  onGetPostInRealTime((querySnapShot) => {
    let cleaner = '';
    querySnapShot.forEach((doc) => {
      const post = doc.data();
      cleaner += `
    <section id='postContainer' class= "postContainer">
        <div id='userInfoDiv'></div>
        <p id='user-name'></p>
        <div id='postTitle'>${post.title}</div>
        <div id='postBody'>${post.body}</div>
        <button id="btn-deleted" class="btn-deleted-class" data-id="${doc.id}">Delete</button>
        <button id="btn-edit" class="btn-edit-class" data-id="${doc.id}">Edit</button>
        <div id='interaction'>
          <div id="div-btn-like">
          <button id="like-btn" class="btn-like-class" data-id="${doc.id}">LIKE
          </button>
          <div id='counter-like'><p>${post.like.length}</p></div>
          </div>
          <div id='div-btn-deslike'
          <button id="deslike-btn" class="btn-deslike-class" data-id="${doc.id}">
          DESLIKE</button>
          <div id='counter-deslike'><p></p></div>
          </div>
          </div>
      </section>
    `;
    });
    feedPostWrapper.innerHTML = cleaner;

    const btnsDeletePost = feedPostWrapper.querySelectorAll('.btn-deleted-class');
    btnsDeletePost.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        deletePost(event.target.dataset.id);
      });
    });

    // Make btn for Editing post
    const btnsEdit = feedPostWrapper.querySelectorAll('.btn-edit-class');
    btnsEdit.forEach((btnE) => {
      btnE.addEventListener('click', async (e) => {
        formNewPost.classList.remove('hide');
        const doc = await getSinglePost(e.target.dataset.id);
        const post = doc.data();
        newPostTitle.value = post.title;
        newPostBody.value = post.body;

        editStatus = true;
        id = doc.id;
      });
    });
   /*  const btnLikes = feedPostWrapper.querySelectorAll('.btn-like-class');
    console.log(btnLikes);
    btnLikes.forEach((btnL) => {
      btnL.addEventListener('click', (event) => {
        const arrayLike = doc.data().like;
        console.log(event.target.dataset.id);
        // declarrar en n varibale un doc.data().like
        // crear un id y un else, en el if=condicion si incluye dentro del array(like) el identificador (user id), que lo saque
        // else, lo mismo pero que lo ingrese

      });
    }); */
  });

  // event to submit new post, edit and actualice post
  formNewPost.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!editStatus) {
      store({ title: newPostTitle.value, body: newPostBody.value, userId }, 'publicaciones');
    } else {
      updatePost(id, { title: newPostTitle.value, body: newPostBody.value, userId });
      editStatus = false;
    }

    formNewPost.reset();
    formNewPost.classList.add('hide');
  });

  return feedWrapper;
};

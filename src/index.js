import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './fetchImages';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('[type=text]'),
  //   button: document.querySelector('[type=submit]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearchImages);

// refs.input.addEventListener('input', onSearchImages);

function onSearchImages(event) {
  event.preventDefault();

  if (refs.input.value === '') {
    return;
  }

  fetchImages(refs.input.value)
    .then(markupCreationCondition)
    .catch(error =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}

// Умова створення розмітки
function markupCreationCondition(images) {
  if (parseInt(images.totalHits) === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
  createGaleryMarkup(images);
}

// Розмітка галереї
function createGaleryMarkup(images) {
  const galleryElementMarkup = images.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        downloads,
        likes,
        views,
        comments,
      }) => {
        return ` <div class="photo-card">
        <a class="link" href="${largeImageURL}">
   <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div></a>
</div>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', galleryElementMarkup);
  new SimpleLightbox('.gallery a', {
    animationSpeed: 150,
  });
}

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
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let numberPage = 1;

// Пошук зображень
function onSearchImages(event) {
  event.preventDefault();
  deactivateLoadMoreBTN();
  if (refs.input.value === '') {
    return;
  }
  resetPage();
  clearMarkup();
  // const searchQuery = event.currentTarget.elements.query.value;
  fetchImages(refs.input.value, numberPage)
    .then(markupCreationCondition)
    .catch(error =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}

// Кнопка LoadMore
function onLoadMore() {
  incrementPage();
  fetchImages(refs.input.value, numberPage)
    .then(markupCreationCondition)
    .catch(error =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}
function incrementPage() {
  numberPage += 1;
}
function resetPage() {
  numberPage = 1;
}

// Умова створення розмітки
function markupCreationCondition(images) {
  // console.log(numberPage * 40);

  if (parseInt(images.totalHits) === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  if (numberPage === 1) {
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
  }
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

  // Активує кнопку після першої сторінки
  activateLoadMoreBTN();

  // якщо закінчились картинки, виводить повідомлення і вімикає кнопку
  if (numberPage * 40 > parseInt(images.totalHits)) {
    deactivateLoadMoreBTN();

    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function activateLoadMoreBTN() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function deactivateLoadMoreBTN() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
